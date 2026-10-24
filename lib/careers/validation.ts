import { z } from "zod";
import { INTERNSHIP_ID } from "./types";
const line = (min: number, max: number) => z.string().trim().min(min).max(max).refine((v) => !/[\r\n\x00-\x1f]/.test(v), "Use a single line of text.");
export const jobSchema = z.object({
  title: line(3, 160), discipline: line(2, 100), location: line(2, 160),
  experience: line(1, 100), employment_type: line(2, 80),
  summary: z.string().trim().min(10).max(1000),
  responsibilities: z.string().trim().min(10).max(8000),
  qualifications: z.string().trim().min(10).max(8000),
  status: z.enum(["draft", "published", "closed"]),
});
export const applicationSchema = z.object({
  name: line(2, 120), email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(30).regex(/^\+?[\d\s().-]+$/, "Enter a valid phone number."),
  category: z.enum(["job", "internship"]), opportunity: z.string().max(100),
  discipline: line(2, 100), experience: line(1, 100), city: z.string().trim().max(160),
  message: z.string().trim().max(2000), consent: z.literal(true, { error: "Please agree to share your application for recruitment." }),
}).superRefine((data, ctx) => {
  const valid = data.category === "job" ? z.string().uuid().safeParse(data.opportunity).success : data.opportunity === INTERNSHIP_ID;
  if (!valid) ctx.addIssue({ code: "custom", path: ["opportunity"], message: "Select a valid opportunity." });
});
export type Application = z.infer<typeof applicationSchema>;
