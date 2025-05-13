import { z } from "zod";

export const userApplicationSchema = z.object({
  role: z.string().nonempty(),
  company: z.string().nonempty(),
  jobLink: z.string().nonempty(),
  city: z.string().nonempty(),
  country: z.string().nonempty(),
  state: z.string().nonempty(),
  description: z.string().nonempty(),
});

export type userApplicationTypes = z.infer<typeof userApplicationSchema>;
