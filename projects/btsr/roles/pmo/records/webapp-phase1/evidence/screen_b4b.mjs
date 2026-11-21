import {spawn} from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
const [chrome, base, profile, out] = process.argv.slice(2);
const proc = spawn(chrome, ["--headless=new", "--no-first-run", "--disable-background-networking",
  "--ignore-certificate-errors", "--remote-debugging-port=0", "--user-data-dir="+profile, "about:blank"], {stdio:"ignore"});
const sleep = ms => new Promise(r=>setTimeout(r,ms));
let socket;
try {
  const portFile = path.join(profile,"DevToolsActivePort");
  for(let i=0;i<100 && !fs.existsSync(portFile);i++) await sleep(100);
  const port = fs.readFileSync(portFile,"utf8").split("\n")[0];
  const pages = await (await fetch("http://localhost:"+port+"/json/list")).json();
  socket = new WebSocket(pages.find(p=>p.type==="page").webSocketDebuggerUrl);
  await new Promise(r=>socket.onopen=r);
  let id=0; const calls=new Map();
  socket.onmessage=e=>{const m=JSON.parse(e.data); if(calls.has(m.id)){calls.get(m.id)(m); calls.delete(m.id)}};
  async function call(method,params={}) {
    const n=++id; const wait=new Promise(r=>calls.set(n,r)); socket.send(JSON.stringify({id:n,method,params}));
    const m=await wait; if(m.error) throw Error(m.error.message); return m.result;
  }
  async function run(expression){
    const m=await call("Runtime.evaluate",{expression,awaitPromise:true,returnByValue:true});
    if(m.exceptionDetails) throw Error(m.exceptionDetails.exception.description); return m.result.value;
  }
  async function until(expr){for(let i=0;i<100;i++){if(await run(expr))return;await sleep(100)}throw Error(expr)}
  async function shot(name){const r=await call("Page.captureScreenshot",{format:"png"});fs.writeFileSync(path.join(out,name),Buffer.from(r.data,"base64"))}
  await call("Emulation.setDeviceMetricsOverride",{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await call("Page.navigate",{url:base+"/#jobs"}); await until("document.querySelector('.pad button')!==null");
  await run("Array.from("+JSON.stringify(process.env.TEST_PIN)+").forEach(press)");
  await until("typeof view!=='undefined' && view==='jobs'");
  await run("show('man')");await until("document.querySelector('#devBox')!==null");
  assert.deepEqual(await run("[...document.querySelectorAll('#pushButtons button')].map(b=>[b.textContent,b.disabled])"),
    [["알림 켜기",true],["알림 끄기",true],["시험 알림",true]]);
  await shot("92_b4b_manual_browser.png");
  // 아이폰 홈 화면 실행 조건만 주입. 서비스 워커 등록과 서버 공개 키는 실제 로컬 HTTPS 경로.
  await run("Object.defineProperty(navigator,'standalone',{value:true}); refreshPush()");
  await until("!document.getElementById('pushOn').disabled");
  assert.equal(await run("!!pushRegistration.active && !!pushKey"),true);
  await shot("92_b4b_manual_standalone.png");
  // 시험 휴대폰 구독만 모의한다. subscribe/test/unsubscribe는 실제 서버 API로 보낸다.
  await run(`(async () => {
    const key = await crypto.subtle.generateKey({name:"ECDH",namedCurve:"P-256"},true,["deriveBits"]);
    const raw = await crypto.subtle.exportKey("raw",key.publicKey);
    const encode = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes))).replaceAll("+","-").replaceAll("/","_").replaceAll("=","");
    const json = {endpoint:"https://test.push.apple.com/screen",keys:{p256dh:encode(raw),auth:encode(crypto.getRandomValues(new Uint8Array(16)))}};
    Object.defineProperty(Notification,"requestPermission",{value:async()=>"granted"});
    Object.defineProperty(pushRegistration.pushManager,"subscribe",{value:async()=>({endpoint:json.endpoint,toJSON:()=>json,unsubscribe:async()=>true})});
  })()`);
  await run("document.getElementById('pushOn').click()"); await until("!document.getElementById('pushTest').disabled");
  await run("document.getElementById('pushTest').click()"); await until("document.getElementById('toast').textContent==='시험 알림을 보냈어요'");
  await run("document.getElementById('pushOff').click()"); await until("!document.getElementById('pushOn').disabled");
  assert.equal(await run("document.getElementById('pushTest').disabled && document.getElementById('pushOff').disabled"),true);
  console.log("PIN -> Jobs / subscribe -> test -> unsubscribe OK (local transport)");
  console.log("390px Manual: browser disabled / standalone enabled / service worker active / API public key OK");
} finally {
  socket?.close(); proc.kill(); await new Promise(r=>{if(proc.exitCode!==null)r();else proc.once("exit",r)});
}
