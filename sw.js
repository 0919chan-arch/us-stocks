// 오프라인용: 새 데이터를 먼저 받고, 안 되면 마지막에 받아 둔 것을 보여줌
const C='mc-74e722ea07af';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html'])).catch(()=>{}));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request, u=new URL(r.url); if(r.method!=='GET'||u.origin!==location.origin||u.pathname.endsWith('version.json')) return;
  e.respondWith(fetch(r.mode==='navigate'?r.url:r,{cache:'no-cache'}).then(res=>{ if(res.ok){const cp=res.clone(); caches.open(C).then(c=>c.put(r,cp));} return res; })
    .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('index.html'))));});
