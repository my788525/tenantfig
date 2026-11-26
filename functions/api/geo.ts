interface CfProperties {
  country?: string;
  regionCode?: string;
}

export async function onRequestGet(context: {
  request: Request & { cf?: CfProperties };
}): Promise<Response> {
  const cf = context.request.cf;
  const country = (
    cf?.country ??
    context.request.headers.get('CF-IPCountry') ??
    ''
  )
    .trim()
    .toUpperCase();
  const regionCode = (cf?.regionCode ?? '').trim().toUpperCase();

  return new Response(JSON.stringify({ country, regionCode }), {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store, max-age=0',
    },
  });
}
