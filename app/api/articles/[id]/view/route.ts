import { createPublicClient, isSupabaseConfigured } from "@/lib/supabase/server";
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!isSupabaseConfigured || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return new Response(null, { status: 204 });
  let host = "direct";
  try { const referrer = request.headers.get("referer"); if (referrer) host = new URL(referrer).hostname || "direct"; } catch {}
  try {
    const { error } = await createPublicClient().rpc("record_article_view", { p_article_id: id, p_referrer_host: host });
    return new Response(null, { status: error ? 503 : 204 });
  } catch { return new Response(null, { status: 503 }); }
}
