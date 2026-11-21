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
  async function until(expr){for(let i=0;i<450;i++){if(await run(expr))return;await sleep(100)}throw Error(expr)}
  async function shot(name){const r=await call("Page.captureScreenshot",{format:"png"});fs.writeFileSync(path.join(out,name),Buffer.from(r.data,"base64"))}
  await call("Emulation.setDeviceMetricsOverride",{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await call("Page.navigate",{url:base+"/#jobs"}); await until("document.querySelector('.pad button')!==null");
  await run("Array.from("+JSON.stringify(process.env.TEST_PIN)+").forEach(press)");
  await until("typeof view!=='undefined' && view==='jobs'");
  if (process.argv[6] === "face") {
    await until("document.querySelector('#nowCard [data-q]')");
    const actions = () => run("[...document.querySelectorAll('#nowCard [data-act]')].map(b=>b.textContent)");
    assert.deepEqual(await actions(), ["이 사진으로 갈게요 →"]);
    assert.equal(await run("document.getElementById('nowCard').innerText.includes('번 남음')"), false);
    await run("document.querySelector('#nowCard [data-q]').click()");
    await until("!document.getElementById('qpop').hidden");
    assert.match(await run("document.getElementById('qpop').innerText"), /다시 만들기를 다 썼어요\./);
    await shot("115_iva_face.png");
    console.log("screen_face_after_two_remakes OK");
  } else {
    await run("document.querySelector('nav [data-tab=up]').click()");
    await until("!document.getElementById('picker').disabled && view==='up'");
    const {root} = await call("DOM.getDocument");
    const {nodeId} = await call("DOM.querySelector", {nodeId:root.nodeId, selector:"#picker"});
    await run(`window.batchCalls = 0; window.progressSeen = false;
      const originalFetch = window.fetch.bind(window);
      window.fetch = (url, opts) => {
        if (String(url)==='/api/batch' && opts?.method==='POST') batchCalls++;
        return originalFetch(url, opts);
      };
      new MutationObserver(() => {
        if (!document.getElementById('s-progress').hidden) progressSeen=true;
      }).observe(document.getElementById('s-progress'), {attributes:true, attributeFilter:['hidden']});`);
    await call("DOM.setFileInputFiles", {nodeId,files:[process.env.TEST_PHOTO]});
    await until("document.getElementById('picker').files.length===1");
    assert.deepEqual(await run("[batchCalls, progressSeen, document.getElementById('s-start').hidden]"), [0,false,false]);
    const rects = await run(`['pickBtn','picker','req0','upOpt'].map(id=>{
      const b=document.getElementById(id).getBoundingClientRect(); return [b.left,b.top,b.right,b.bottom];
    })`);
    for (const [left,top,right,bottom] of rects) assert.ok(left>=0 && right<=390 && top>=0 && bottom<844);
    assert.ok(rects[0][3] <= rects[1][1] && rects[1][3] <= rects[2][1] && rects[2][3] <= rects[3][1]);
    await run("document.getElementById('req0').focus()");
    await call("Input.insertText",{text:"디지털펌"});
    assert.equal(await run("document.getElementById('req0').value"), "디지털펌");
    await shot("115_iva_send.png");
    await run("document.getElementById('pickBtn').click()");
    await until("batchCalls===1 && progressSeen && view==='jobs'");
    console.log("screen_send_select_request_then_send OK",JSON.stringify(rects));
    await run("document.querySelector('nav [data-tab=post]').click()");
    const ready = "document.querySelector('[data-copy=\"2099-10-01_1200:instagram\"]')";
    const failed = "document.querySelector('[data-copy=\"2099-10-01_1201:instagram\"]')";
    await until(`${ready}?.disabled && ${failed}?.disabled && ${ready}.closest('.pc').innerText.includes('캡션을 준비하는 중이에요')`);
    fs.writeFileSync(process.env.TEST_MARKER,"seen");
    await until(`view==='post' && ${ready} && !${ready}.disabled && ${failed}.closest('.pc').innerText.includes('캡션 없이 영상만 쓸 수 있어요')`);
    const failureCard = await run(`${failed}.closest('.pc').innerText`);
    assert.equal(failureCard.split("캡션 없이 영상만 쓸 수 있어요").length - 1, 1);
    assert.ok(!failureCard.includes("캡션을 준비하는 중이에요"));
    assert.equal(await run(`${failed}.disabled && !${failed}.closest('.pc').querySelector('[data-save]').disabled`),true);
    assert.ok((await run(`${ready}.closest('.plat').innerText`)).includes("시험 캡션"));
    await shot("115_iva_post.png");
    await run(`${ready}.closest('.plat').scrollIntoView({block:'center'})`);
    await shot("115_iva_post_ready.png");
    console.log("screen_open_post_caption_ready_and_failure OK");
  }
} finally {
  socket?.close(); proc.kill(); await new Promise(r=>{if(proc.exitCode!==null)r();else proc.once("exit",r)});
}
