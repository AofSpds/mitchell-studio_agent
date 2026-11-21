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
  const screen=process.argv[6];
  const card=documentText=>run("document.getElementById('nowCard').innerText.includes("+JSON.stringify(documentText)+")");
  await until("document.querySelector('#nowCard button')!==null");
  if(screen==="17") {
    assert.equal(await card("얼굴이 보이는 시술 후 사진이 없어요"),true);
    assert.deepEqual(await run("[...document.querySelectorAll('#nowCard button[data-act]')].map(b=>b.textContent)"),["AI 얼굴 없이 갈게요 →","더 보내기"]);
    assert.equal(await run("document.querySelectorAll('.thumbs .none').length"),1);
    await sleep(400);await shot("102_b82_s17.png");
    await run("document.querySelector('#nowCard button[data-act]').click()");
    await until("!document.querySelector('#nowCard [data-qid]')");
  } else {
    await run("document.querySelector('#nowCard [data-q]').click()");
    await until("!document.getElementById('qpop').hidden");
    assert.equal(await card("다시 만들기는 2번 더 할 수 있어요"),true);
    assert.equal(await card("2번 남음"),true);
    await sleep(400);await shot("102_b82_s05.png");
  }
  console.log("Screen "+screen+" OK at 390px");
} finally {
  socket?.close(); proc.kill(); await new Promise(r=>{if(proc.exitCode!==null)r();else proc.once("exit",r)});
}
