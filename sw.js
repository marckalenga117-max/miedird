const C='miedird-v2';
const F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(caches.match(e.request).then(r=>{
    const net=fetch(e.request).then(n=>{if(n&&n.ok){const c=n.clone();caches.open(C).then(x=>x.put(e.request,c))}return n}).catch(()=>r||caches.match('index.html'));
    return r||net;
  }));
});
