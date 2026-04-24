// Proxy: POST /a/e → cloud.umami.is/api/send
// Forward visitor IP (CF-Connecting-IP) so Umami geo-locates the visitor, not the CF datacenter.
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
