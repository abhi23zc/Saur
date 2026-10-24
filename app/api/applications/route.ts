import { createApplicationHandler } from "@/lib/careers/applications";
import { getPublishedJob } from "@/lib/careers/data";
import { sendApplication } from "@/lib/careers/mail";
export const runtime = "nodejs";
export const POST = createApplicationHandler({ getJob: getPublishedJob, send: sendApplication });
