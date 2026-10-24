import { courses } from "@/data/site";

export type TrainingProgramme = {
  id: string;
  number: string;
  title: string;
  description: string;
  topics: string[];
};

// Publish only concise course information; batch dates and durations need confirmation.
export const trainingProgrammes: TrainingProgramme[] = courses.map((course) => ({
  id: course.id,
  number: course.number,
  title: course.title,
  description: course.description,
  topics: course.highlights.slice(0, 5),
}));

export type TrainingEnquiry = {
  name: string;
  email: string;
  organization: string;
  phone: string;
  message: string;
  website: string;
};

export function trainingEnquiryError(form: TrainingEnquiry): string | null {
  if (!form.name.trim()) return "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return "Please enter a valid email address.";
  if (!form.organization.trim()) return "Please enter your college or organization.";
  if (form.message.trim().length < 10) return "Please enter at least 10 characters about your training needs.";
  return null;
}

export async function sendTrainingEnquiry(
  course: TrainingProgramme,
  form: TrainingEnquiry,
  fetcher: typeof fetch = fetch,
): Promise<void> {
  const error = trainingEnquiryError(form);
  if (error) throw new Error(error);
  const response = await fetcher("/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...form, type: "training", selection: course.title }),
  });
  const body = await response.json();
  if (!response.ok || body.ok !== true) {
    throw new Error(body.error || "Your enquiry could not be sent. Please try again.");
  }
}
