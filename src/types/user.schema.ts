import { z } from 'zod';
import { authSchema } from '@/types/auth.schema';

export const userSchema = authSchema.pick({
  username: true
}).extend({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  lastName: z.string()
})
export type User = z.infer<typeof userSchema>;
