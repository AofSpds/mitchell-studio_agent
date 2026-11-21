# 웹앱 https 켜기 — 한알께 드리는 한 장 (맥 손일 · 명령 · 하지 말 것)

| 칸 | 내용 |
|---|---|
| 판 | 1판 — 2026-11-21 14:10 KST, ARCH. 설계 [묶음 4-b](WEBAPP_PHASE1_B4B_DESIGN_CLAUDE.md) |
| 언제 | **1차 끝 맥 시험 때 한 번**(결정 08). 그 전에는 하지 않으셔도 됩니다 |
| 걸리는 시간 | 10분쯤 |
| 무엇이 좋아지나 | 휴대폰 홈 화면 웹앱에 **알림**이 오고(원고 확인 등), 완성본을 **사진 앱으로 바로** 보낼 수 있게 됩니다 |
| 알고 정하신 것 | 맥 이름 · Tailscale 망 이름이 공개 인증서 장부에 남습니다(결정 05). 웹앱이 인터넷에 열리지는 않습니다 |

## 먼저 — 하지 말 것

1. **Funnel(퍼널)을 켜지 마세요.** Tailscale 화면 · 명령 어디에서든 'Funnel'이 보이면 누르지 않습니다. 켜면 웹앱이 인터넷에 열립니다.
2. 공유기 설정(포트 열기 · 포워딩)을 바꾸지 마세요.
3. 맥을 다른 사람 Tailscale에 공유(Share)하지 마세요.
4. Tailscale 키 · 인증서 파일 · 알림 키를 채팅 · 메모 · 사진으로 옮기지 마세요. 화면에 길고 이상한 글자가 나오면 그대로 두시면 됩니다.
5. 아래 명령 말고 다른 `tailscale` 명령(`reset` · `logout` · `down`)은 치지 마세요. 휴대폰과의 연결이 끊깁니다.
6. 옛 홈 화면 아이콘(http 주소)은 3번을 끝낸 **뒤에** 지우세요(먼저 지우면 확인할 길이 없어집니다).

## 1. Tailscale 관리 화면에서 HTTPS 켜기 (휴대폰이나 맥 브라우저)

1. Tailscale 관리 화면(login.tailscale.com)에 들어가 **DNS** 탭을 엽니다.
2. **MagicDNS**가 켜져 있는지 봅니다(지금 `….ts.net` 주소가 열리면 이미 켜져 있음).
3. 아래쪽 **HTTPS Certificates** → **Enable HTTPS** 를 누릅니다. 공개 장부 안내가 나오면 확인합니다.

## 2. 맥 터미널에서 두 줄

맥에서 '터미널' 앱을 열고 한 줄씩 붙여 넣습니다.

```
/Applications/Tailscale.app/Contents/MacOS/Tailscale serve --bg 8765
/usr/bin/python3 -m pip install --user cryptography
```

- **오류가 나오면 더 하지 마시고 그 화면을 그대로 두고 알려 주세요.** (명령 꼴은 Tailscale 판에 따라 다를 수 있어 맥 시험 때 ARCH가 그 판으로 다시 맞춥니다)
- 첫 줄: 웹앱을 https 주소로 엽니다(Tailscale 망 안에서만). 맥을 다시 켜도 남습니다.
- 둘째 줄: 알림을 보낼 때 쓰는 것을 깝니다. 끝에 'Successfully installed'가 나오면 됩니다.
- 확인: `/Applications/Tailscale.app/Contents/MacOS/Tailscale serve status` → `https://…ts.net` 한 줄과 `127.0.0.1:8765`가 보이면 됩니다. **'Funnel on'이 보이면 안 됩니다**(보이면 아래 '되돌리기').

## 3. 휴대폰에서

1. Tailscale을 켜고, 사파리에서 `https://<맥 이름>.<망 이름>.ts.net` (포트 숫자 없이)을 엽니다. 자물쇠가 보이고 경고가 없으면 됩니다.
2. PIN을 넣습니다(주소가 바뀌어 한 번 더 묻는 것이 정상).
3. 공유 → **홈 화면에 추가** → 새 아이콘으로 엽니다 → Manual 탭 → 「알림 켜기」 → 허용.
4. Manual 탭의 **시험 알림**을 눌러 알림이 오는지 봅니다. 오면 옛 아이콘을 지웁니다.

## 되돌리기 (이상하면)

```
/Applications/Tailscale.app/Contents/MacOS/Tailscale serve --https=443 off
```

- 웹앱은 옛 http 주소로 그대로 열립니다. 알림만 안 옵니다.
