export type JobStatus = "draft" | "published" | "closed";
export type Job = {
  id: string;
  title: string;
  discipline: string;
  location: string;
  experience: string;
  employment_type: string;
  summary: string;
  responsibilities: string;
  qualifications: string;
  status: JobStatus;
  created_at: string;
  updated_at: string;
};
export type JobListings = { jobs: Job[]; available: boolean };
export const INTERNSHIP_ID = "engineering-internship";
export const MAX_RESUME_BYTES = 3 * 1024 * 1024;
export const disciplines = ["Instrumentation & Control", "Process", "Piping & Mechanical", "Electrical", "Telecommunication", "Civil & Structural", "Plant Design & 3D Modelling", "Other"];
