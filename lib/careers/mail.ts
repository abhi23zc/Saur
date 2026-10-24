import nodemailer from "nodemailer";
import { ApplicationMailUnavailable, type ApplicationDelivery } from "./applications";
export async function sendApplication({ application: a, opportunityTitle, resume }: ApplicationDelivery) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } = process.env;
  const local = ["127.0.0.1", "localhost", "::1"].includes(SMTP_HOST || "") && process.env.NODE_ENV !== "production";
  const port = Number(SMTP_PORT);
  if (!SMTP_HOST || !port || !SMTP_FROM || (!local && (!SMTP_USER || !SMTP_PASSWORD))) throw new ApplicationMailUnavailable();
  const mail = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000, ...(SMTP_USER && SMTP_PASSWORD ? { auth: { user: SMTP_USER, pass: SMTP_PASSWORD } } : {}) });
  const result = await mail.sendMail({
    from: SMTP_FROM, to: ["contact@saurengineering.in", "saurengineeringconsultancy@gmail.com"], replyTo: a.email,
    subject: `[Application: ${a.category}] ${opportunityTitle.replace(/[\r\n]/g, " ")} — ${a.name}`,
    text: [`Opportunity: ${opportunityTitle}`, `Category: ${a.category}`, `Role reference: ${a.opportunity}`, `Name: ${a.name}`, `Email: ${a.email}`, `Phone: ${a.phone}`, `Engineering field: ${a.discipline}`, `Experience: ${a.experience}`, `City: ${a.city || "Not provided"}`, `Consent: Applicant agreed to recruitment processing`, "", a.message || "No additional message."].join("\n"),
    attachments: [{ filename: "resume.pdf", content: resume, contentType: "application/pdf" }],
  });
  // Do not report a partial delivery as a successful application.
  if (result.rejected?.length || !result.accepted?.length) throw new Error("Application delivery was rejected.");
}
