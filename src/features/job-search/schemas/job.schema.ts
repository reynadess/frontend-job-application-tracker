import { z } from "zod";

const StatusEnum = z.enum(["Open", "Closed"], {
  errorMap: () => ({ message: "Status must be one of: Open, Closed." }),
});

export const jobSchema = z.object({
  role: z.string().trim().min(1, "Role is required."),
  company: z.string().trim().min(1, "Company is required."),
  ctcOffered: z.string().trim().min(1, "CTC is required."),
  status: StatusEnum,
  jobLink: z.string().url({ message: "Must be a valid URL." }),
  city: z.string().trim().min(1, "City is required."),
  state: z.string().trim().min(1, "State is required."),
  country: z.string().trim().min(1, "Country is required."),
  description: z.string().trim().min(1, "Description is required."),
});

export type JobTypes = z.infer<typeof jobSchema>;

