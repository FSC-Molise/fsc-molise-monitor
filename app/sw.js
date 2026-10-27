/* Service worker dell'app FSC Molise.
   Tiene in memoria soltanto la pagina e le icone, così l'app si apre anche con
   la rete lenta e si aggiorna da sola. I dati del foglio non passano di qui:
   si leggono sempre dalla rete e non restano salvati sul telefono. */
const VERSIONE = "fsc-app-2026-10-27.1";
const GUSCIO = ["./", "./app.webmanifest", "./icone/icona-192.png", "./icone/icona-512.png",
                "./icone/icona-maskable-192.png", "./icone/icona-maskable-512.png", "./icone/apple-touch-icon.png", "./icone/favicon-64.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSIONE).then((c) => c.addAll(GUSCIO)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((k) => Promise.all(k.filter((n) => n.startsWith("fsc-app-") && n !== VERSIONE).map((n) => caches.delete(n))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;          // dati Google e caratteri: sempre dalla rete
  const ambito = new URL(self.registration.scope).pathname;
  if (!url.pathname.startsWith(ambito)) return;              // la piattaforma completa non passa di qui
  const pagina = req.mode === "navigate" || url.pathname === ambito || url.pathname === ambito + "index.html";
  if (pagina) {
    /* prima la rete, così una nuova versione arriva subito; senza rete, la copia */
    e.respondWith(fetch(req)
      .then((r) => { if (r.ok) { const copia = r.clone(); caches.open(VERSIONE).then((c) => c.put("./", copia)); } return r; })
      .catch(() => caches.match("./").then((r) => r || Response.error())));
    return;
  }
  e.respondWith(caches.match(req).then((r) => r || fetch(req)));
});
