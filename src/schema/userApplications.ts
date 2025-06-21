import { ApplicationStatus } from '@/types/applications.types';
import { z } from 'zod';

export const userApplicationSchema = z.object({
    role: z.string().nonempty(),
    company: z.string().nonempty().optional(),
    jobLink: z.string().nonempty(),
    city: z.string().nonempty().optional(),
    country: z.string().nonempty().optional(),
    state: z.string().nonempty().optional(),
    description: z.string().nonempty().optional(),
    status: z.nativeEnum(ApplicationStatus),
    appliedDate: z.string(),
    ctcOffered: z.number().min(0),
});

export type userApplicationTypes = z.infer<typeof userApplicationSchema>;
