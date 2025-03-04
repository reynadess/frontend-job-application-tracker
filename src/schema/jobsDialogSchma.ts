import { TypeOf, z } from "zod";

export type Label = "Urgent" | "Remote" | "On-site";
export type Priority = "Low" | "Medium" | "High"; 

export const jobFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    status: z.enum(['Applying', 'Applied', 'Bookmark', 'Interview', 'Accepted']),
    priority: z.enum(["Low", "High", "Medium"]),
    label: z.enum(["Urgent", "Remote", "On-site"]),
    companyName: z.string().min(1, "Company name is required").max(100, "Company name is too long"),
    location: z.string().min(1, "Location is required").max(100, "Location is too long"),
    salary: z.number().min(0, "Salary must be a positive number"),
});

export type JobsFormSchemaData = z.infer<typeof jobFormSchema>;