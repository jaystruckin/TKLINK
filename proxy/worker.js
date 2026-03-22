// TKLINK CORS Proxy - Cloudflare Worker
// Deploy at: https://workers.cloudflare.com
// 1. Sign up free → 2. Create Worker → 3. Paste this code → 4. Deploy

const ALLOWED_ORIGIN = 'https://jaystruckin.github.io';

export default {
  async fetch(request) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request),
      });
    }

    // Health check
    const url = new URL(request.url);
    if (url.pathname === '/' || url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok' }), {
        headers: { ...corsHeaders(request), 'Content-Type': 'application/json' },
      });
    }

    // Proxy: pass target URL as query param ?url=
    const targetUrl = url.searchParams.get('url');
    if (!targetUrl) {
      return new Response(JSON.stringify({ error: 'Missing ?url= parameter' }), {
        status: 400,
        headers: { ...corsHeaders(request), 'Content-Type': 'application/json' },
      });
    }

    // Only allow telematics.guru domains
    try {
      const parsed = new URL(targetUrl);
      if (!parsed.hostname.endsWith('telematics.guru')) {
        return new Response(JSON.stringify({ error: 'Only telematics.guru allowed' }), {
          status: 403,
          headers: { ...corsHeaders(request), 'Content-Type': 'application/json' },
        });
      }
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid URL' }), {
        status: 400,
        headers: { ...corsHeaders(request), 'Content-Type': 'application/json' },
      });
    }

    // Forward the request
    const proxyHeaders = new Headers();
    if (request.headers.get('Content-Type')) proxyHeaders.set('Content-Type', request.headers.get('Content-Type'));
    if (request.headers.get('Authorization')) proxyHeaders.set('Authorization', request.headers.get('Authorization'));

    try {
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: proxyHeaders,
        body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.text(),
      });

      const body = await response.text();
      return new Response(body, {
        status: response.status,
        headers: {
          ...corsHeaders(request),
          'Content-Type': response.headers.get('Content-Type') || 'application/json',
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 502,
        headers: { ...corsHeaders(request), 'Content-Type': 'application/json' },
      });
    }
  },
};

function corsHeaders(request) {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}
