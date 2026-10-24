import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { createServer, type Socket } from "node:net";
import { createApplicationHandler, ApplicationMailUnavailable, type ApplicationDelivery } from "../lib/careers/applications";
import { sendApplication } from "../lib/careers/mail";
import { applicationSchema, jobSchema } from "../lib/careers/validation";
import { MAX_RESUME_BYTES, type Job } from "../lib/careers/types";
const id = randomUUID();
const job = { id, title: "Test Engineer", discipline: "Electrical", location: "Mumbai", experience: "2 years", employment_type: "Full-time", summary: "A meaningful engineering role.", responsibilities: "Prepare engineering deliverables.", qualifications: "An engineering qualification.", status: "published", created_at: "", updated_at: "" } satisfies Job;
const pdf = "%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\n%%EOF";
function form(overrides: Record<string, string | File> = {}) {
  const f = new FormData();
  for (const [key, value] of Object.entries({ name: "Test Candidate", email: "candidate@example.test", phone: "+919876543210", category: "job", opportunity: id, discipline: "Electrical", experience: "2 years", city: "", message: "", consent: "on", resume: new File([pdf], "resume.pdf", { type: "application/pdf" }), ...overrides })) f.set(key, value);
  return f;
}
const request = (f = form()) => new Request("http://localhost/api/applications", { method: "POST", body: f });
function handler(getJob: (id: string) => Promise<Job | null> = async () => job, send: (d: ApplicationDelivery) => Promise<void> = async () => {}) { return createApplicationHandler({ getJob, send }); }

test("job validation requires complete role content and a known status", () => {
  assert.equal(jobSchema.safeParse(job).success, true);
  assert.equal(jobSchema.safeParse({ ...job, title: "", status: "active" }).success, false);
  assert.equal(jobSchema.safeParse({ ...job, qualifications: "" }).success, false);
});
test("successful application delivers validated data, authoritative title and PDF bytes", async () => {
  let delivery: ApplicationDelivery | undefined;
  const r = await handler(async () => job, async (d) => { delivery = d; })(request());
  assert.equal(r.status, 200); assert.equal(delivery?.opportunityTitle, job.title); assert.equal(delivery?.resume.toString(), pdf);
  assert.equal(delivery?.application.consent, true);
});
test("missing fields and consent are rejected before delivery", async () => {
  for (const field of ["name", "email", "phone", "discipline", "experience", "opportunity", "consent"]) {
    const f = form(); f.delete(field); let sent = false;
    const r = await handler(undefined, async () => { sent = true; })(request(f));
    assert.equal(r.status, 400, field); assert.equal(sent, false);
  }
  assert.equal(applicationSchema.safeParse({ name: "\n", consent: true }).success, false);
});
test("invalid names, emails, phones and opportunity IDs are rejected", async () => {
  for (const values of ([{ email: "invalid" }, { phone: "abcdefghi" }, { name: "Injected\nSubject" }, { opportunity: "invented-role" }] as Record<string, string>[])) assert.equal((await handler()(request(form(values)))).status, 400);
});
test("missing resume, non-PDF, renamed file, malformed and oversized PDFs are rejected", async () => {
  const missing = form(); missing.delete("resume"); assert.equal((await handler()(request(missing))).status, 400);
  for (const file of [new File([pdf], "cv.docx", { type: "application/pdf" }), new File([pdf], "cv.pdf", { type: "text/plain" }), new File(["not PDF"], "cv.pdf", { type: "application/pdf" }), new File(["%PDF-no-end"], "cv.pdf", { type: "application/pdf" })]) assert.equal((await handler()(request(form({ resume: file })))).status, 400);
  assert.equal((await handler()(request(form({ resume: new File([new Uint8Array(MAX_RESUME_BYTES + 1)], "cv.pdf", { type: "application/pdf" }) })))).status, 413);
});
test("a closed or missing vacancy cannot accept applications", async () => {
  for (const result of [null, { ...job, status: "closed" as const }, { ...job, status: "draft" as const }]) assert.equal((await handler(async () => result)(request())).status, 409);
});
test("verification outages differ from closed jobs", async () => {
  const r = await handler(async () => { throw new Error("database offline"); })(request()); assert.equal(r.status, 503);
});
test("internships use an allowed interest without requiring an employment vacancy", async () => {
  const r = await handler(async () => { throw new Error("must not query jobs"); })(request(form({ category: "internship", opportunity: "engineering-internship" }))); assert.equal(r.status, 200);
  assert.equal((await handler()(request(form({ category: "internship", opportunity: "invented-programme" })))).status, 400);
});
test("mail configuration and delivery failures are retryable, not false successes", async () => {
  for (const [error, code] of [[new ApplicationMailUnavailable(), 503], [new Error("SMTP offline"), 502]] as const) assert.equal((await handler(undefined, async () => { throw error; })(request())).status, code);
});
test("malformed multipart and oversized streaming requests are rejected", async () => {
  assert.equal((await handler()(new Request("http://localhost", { method: "POST", body: "invalid" }))).status, 400);
  const r = await handler()(new Request("http://localhost", { method: "POST", headers: { "content-type": "multipart/form-data; boundary=x" }, body: new Uint8Array(MAX_RESUME_BYTES + 65537) })); assert.equal(r.status, 413);
});
test("honeypot does not send an application", async () => {
  let sent = false; const r = await handler(undefined, async () => { sent = true; })(request(form({ website: "spam" }))); assert.equal(r.status, 200); assert.equal(sent, false);
});

test("SMTP delivery sends PDF attachment and recipients to an isolated local test inbox", async () => {
  const messages: string[] = []; let recipients = 0; const sockets = new Set<Socket>();
  const smtp = createServer((socket) => {
    sockets.add(socket); socket.on("close", () => sockets.delete(socket)); socket.write("220 local-test ESMTP\r\n");
    let buffer = "", dataMode = false;
    socket.on("data", (chunk) => {
      buffer += chunk.toString();
      while (buffer.includes("\r\n")) {
        if (dataMode) { const end = buffer.indexOf("\r\n.\r\n"); if (end < 0) break; messages.push(buffer.slice(0, end)); buffer = buffer.slice(end + 5); dataMode = false; socket.write("250 queued\r\n"); continue; }
        const end = buffer.indexOf("\r\n"); const command = buffer.slice(0, end); buffer = buffer.slice(end + 2);
        if (/^EHLO|^HELO/i.test(command)) socket.write("250 local-test\r\n");
        else if (/^DATA/i.test(command)) { dataMode = true; socket.write("354 continue\r\n"); }
        else if (/^QUIT/i.test(command)) socket.end("221 bye\r\n");
        else { if (/^RCPT TO:/i.test(command)) recipients++; socket.write("250 ok\r\n"); }
      }
    });
  });
  await new Promise<void>((resolve) => smtp.listen(0, "127.0.0.1", resolve));
  const keys = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM", "NODE_ENV"] as const;
  const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  try {
    const address = smtp.address(); assert.ok(address && typeof address !== "string");
    Object.assign(process.env, { SMTP_HOST: "127.0.0.1", SMTP_PORT: String(address.port), SMTP_USER: "", SMTP_PASSWORD: "", SMTP_FROM: "local@example.test", NODE_ENV: "test" });
    let delivery: ApplicationDelivery | undefined;
    await handler(undefined, async (d) => { delivery = d; })(request()); assert.ok(delivery);
    await sendApplication(delivery);
    assert.equal(recipients, 2); assert.equal(messages.length, 1);
    assert.match(messages[0], /contact@saurengineering.in/); assert.match(messages[0], /saurengineeringconsultancy@gmail.com/); assert.match(messages[0], /application\/pdf/); assert.match(messages[0], /resume.pdf/); assert.match(messages[0], /Reply-To: candidate@example.test/i);
    const encoded = messages[0].split("\r\n").join(""); assert.ok(encoded.includes(Buffer.from(pdf).toString("base64")));
  } finally { for (const key of keys) { const environment: Record<string, string | undefined> = process.env; if (previous[key] === undefined) delete environment[key]; else environment[key] = previous[key]; } for (const socket of sockets) socket.destroy(); await new Promise<void>((resolve) => smtp.close(() => resolve())); }
});

test("unified training catalogue preserves six course areas and SPI without unconfirmed batch metadata", async () => {
  const { trainingProgrammes } = await import("../lib/careers/training");
  assert.equal(trainingProgrammes.length, 6);
  assert.equal(new Set(trainingProgrammes.map((course) => course.id)).size, 6);
  for (const course of trainingProgrammes) {
    assert.ok(course.description.length > 10);
    assert.ok(course.topics.length > 0 && course.topics.length <= 5);
    assert.equal("duration" in course, false);
    assert.equal("batchSchedule" in course, false);
  }
  const instrumentation = trainingProgrammes.find((course) => course.id === "instrumentation-engineering");
  assert.ok(instrumentation?.topics.some((topic) => /SPI|INtools/.test(topic)));
});

test("course enquiries require core contact details and a message but no CV or phone", async () => {
  const { trainingEnquiryError } = await import("../lib/careers/training");
  const form = { name: "Student", email: "student@example.test", organization: "Test College", phone: "", message: "Please share the learning options.", website: "" };
  assert.equal(trainingEnquiryError(form), null);
  for (const key of ["name", "email", "organization", "message"] as const) assert.ok(trainingEnquiryError({ ...form, [key]: "" }));
});

test("course enquiry sends the chosen programme through the existing training endpoint", async () => {
  const { sendTrainingEnquiry, trainingProgrammes } = await import("../lib/careers/training");
  let payload: Record<string, unknown> = {};
  const form = { name: "Student", email: "student@example.test", organization: "Test College", phone: "", message: "Please share the learning options.", website: "" };
  const fakeFetch: typeof fetch = async (url, init) => {
    assert.equal(url, "/api/enquiries");
    payload = JSON.parse(String(init?.body));
    return Response.json({ ok: true });
  };
  await sendTrainingEnquiry(trainingProgrammes[3], form, fakeFetch);
  assert.equal(payload.type, "training");
  assert.equal(payload.selection, "Instrumentation Engineering & Design");
  assert.equal(payload.organization, "Test College");
  assert.equal("resume" in payload, false);
});

test("course enquiry failures preserve input for retry and do not claim success", async () => {
  const { sendTrainingEnquiry, trainingProgrammes } = await import("../lib/careers/training");
  const form = { name: "Student", email: "student@example.test", organization: "Test College", phone: "", message: "Please share the learning options.", website: "" };
  const before = { ...form };
  await assert.rejects(sendTrainingEnquiry(trainingProgrammes[0], form, async () => Response.json({ error: "Email is unavailable." }, { status: 503 })), /Email is unavailable/);
  await assert.rejects(sendTrainingEnquiry(trainingProgrammes[0], form, async () => Response.json({ ok: false })), /could not be sent/);
  await assert.rejects(sendTrainingEnquiry(trainingProgrammes[0], form, async () => { throw new Error("Network error"); }), /Network error/);
  assert.deepEqual(form, before);
});
