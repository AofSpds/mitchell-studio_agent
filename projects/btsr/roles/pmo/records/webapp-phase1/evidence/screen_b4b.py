"""python screen_b4b.py <repo> <chrome>. 임시 HTTPS 원점과 실제 서비스 워커, 시험 장치에서만 실행."""
from datetime import datetime, timedelta, timezone
import os
from pathlib import Path
import secrets
import ssl
import subprocess
import sys
import tempfile
import threading

from cryptography import x509
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.x509.oid import NameOID

repo, chrome = sys.argv[1:]
with tempfile.TemporaryDirectory() as tmp:
    root = Path(tmp)
    pin = str(secrets.randbelow(900000) + 100000)
    os.environ.update(WEBAPP_PIN=pin, WEBAPP_SECRET=secrets.token_hex(32), WEBAPP_DATA_DIR=str(root / "data"),
                      WEBAPP_CONFIG_DIR=str(root / "config"), WEBAPP_DEV_PUSH="0", WEBAPP_RUNNER="0",
                      WEBAPP_ENV_FILE=str(root / "empty.env"), WEBAPP_TICK_SECONDS="0")
    sys.path.insert(0, str(Path(repo) / "app/webapp"))
    import server
    server.webpush.transmit = lambda endpoint, headers, data: 201 if endpoint == 'https://test.push.apple.com/screen' and data else 400
    server.ICON = server.make_icon()
    private = ec.generate_private_key(ec.SECP256R1())
    subject = x509.Name([x509.NameAttribute(NameOID.COMMON_NAME, "localhost")])
    now = datetime.now(timezone.utc)
    cert = (x509.CertificateBuilder().subject_name(subject).issuer_name(subject).public_key(private.public_key())
            .serial_number(x509.random_serial_number()).not_valid_before(now).not_valid_after(now + timedelta(hours=1))
            .add_extension(x509.SubjectAlternativeName([x509.DNSName("localhost")]), critical=False)
            .sign(private, hashes.SHA256()))
    pem = root / "local.pem"
    pem.write_bytes(cert.public_bytes(serialization.Encoding.PEM) +
                    private.private_bytes(serialization.Encoding.PEM, serialization.PrivateFormat.PKCS8, serialization.NoEncryption()))
    ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    ctx.load_cert_chain(pem)
    with server.Server(("127.0.0.1", 0), server.Handler) as srv:
        srv.socket = ctx.wrap_socket(srv.socket, server_side=True)
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        try:
            subprocess.run(["node", str(Path(__file__).with_suffix(".mjs")), chrome,
                            f"https://localhost:{srv.server_port}", str(root / "chrome"), str(Path(__file__).parent)],
                           check=True, env=dict(os.environ, TEST_PIN=pin))
        finally:
            srv.shutdown()

