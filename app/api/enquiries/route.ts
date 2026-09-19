import nodemailer from "nodemailer";

export const runtime = "nodejs";
type Enquiry = { type?: string; name?: string; email?: string; organization?: string; phone?: string; selection?: string; message?: string; website?: string };
const recipients = "contact@saurengineering.in,saurengineeringconsultancy@gmail.com";
const text = (input: unknown) => typeof input === "string" ? input.trim() : "";
const validEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function POST(request: Request) {
  let payload: Enquiry;
  try { payload = await request.json() as Enquiry; } catch { return Response.json({ error: "Invalid request payload." }, { status: 400 }); }
  const name = text(payload.name), email = text(payload.email), organization = text(payload.organization), phone = text(payload.phone), selection = text(payload.selection), message = text(payload.message), type = payload.type === "training" ? "Training" : "Quote";
  if (text(payload.website)) return Response.json({ ok: true });
  if (!name || !validEmail(email) || !organization || !selection || message.length < 10) return Response.json({ error: "Please complete all required fields with a valid email and message." }, { status: 400 });
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM) return Response.json({ error: "Enquiry email is not configured yet. Please contact us directly by email or phone." }, { status: 503 });
  try {
    const transporter = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT), secure: Number(SMTP_PORT) === 465, auth: { user: SMTP_USER, pass: SMTP_PASSWORD } });
    await transporter.sendMail({ from: SMTP_FROM, to: recipients, replyTo: email, subject: `[${type}] ${selection} — ${name}`, text: [`Type: ${type}`, `Name: ${name}`, `Email: ${email}`, `Organization: ${organization}`, `Phone: ${phone || "Not supplied"}`, `Interest: ${selection}`, "", "Message:", message].join("\n") });
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "We could not send your enquiry right now. Please try again or contact us directly." }, { status: 502 }); }
}
