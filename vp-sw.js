// 앱 설치용 최소 서비스워커 — 파일을 저장해 두지 않고 항상 새로 받아옴(예전 화면이 남는 문제 방지)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request;
  // 화면(html)은 브라우저 임시 저장분을 쓰지 않고 매번 서버에서 새로 받음 → 올린 수정이 바로 보이게
  if (r.method === 'GET' && (r.mode === 'navigate' || /\.html$/.test(new URL(r.url).pathname))) {
    e.respondWith(fetch(r.url, { cache: 'no-store', credentials: 'same-origin' }).catch(() => fetch(r)));
    return;
  }
  e.respondWith(fetch(r));
});
