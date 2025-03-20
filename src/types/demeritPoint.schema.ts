import { z } from 'zod';

export const DemeritPointSchema = z.object({
  volunteerId: z.number(),
  reason: z.string(),
  date: z.string(),
  observation: z.string(),
});

export type DemeritPoint = z.infer<typeof DemeritPointSchema>;