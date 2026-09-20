import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
export async function POST(request: Request) { const client = await createClient(); await client.auth.signOut(); return NextResponse.redirect(new URL("/admin/login", request.url), { status: 303 }); }
