// Proxy: POST /a/e → cloud.umami.is/api/send
export async function onRequestPost({ request }) {
  const body = await request.text();
  const res = await fetch('https://cloud.umami.is/api/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': request.headers.get('User-Agent') || '',
    },
    body,
  });
  return new Response(res.body, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
