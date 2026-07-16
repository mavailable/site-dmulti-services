// Proxy de collecte Umami (first-party, anti-adblock).
// Le script Umami (chargé via /a/s avec data-host-url="/a/e") calcule son endpoint
// de collecte en `${data-host-url}/api/send` → il POST vers /a/e/api/send.
// Cette Function DOIT donc vivre à ce chemin exact (et non à /a/e).
// Forward de l'IP visiteur (CF-Connecting-IP) pour que la géoloc Umami reflète
// le visiteur, pas le datacenter Cloudflare.
export async function onRequestPost({ request }) {
  const body = await request.text();
  const visitorIp = request.headers.get('CF-Connecting-IP') || '';
  const res = await fetch('https://cloud.umami.is/api/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': request.headers.get('User-Agent') || '',
      ...(visitorIp ? { 'X-Forwarded-For': visitorIp } : {}),
    },
    body,
  });
  return new Response(res.body, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
