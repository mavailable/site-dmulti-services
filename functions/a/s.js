// Proxy: GET /a/s → cloud.umami.is/script.js
export async function onRequestGet() {
  const res = await fetch('https://cloud.umami.is/script.js');
  return new Response(res.body, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
