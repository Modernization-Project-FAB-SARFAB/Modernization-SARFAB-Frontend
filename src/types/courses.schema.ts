import { z } from "zod";

export const courseSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    description: z.string()
});

export const coursesSelect =  z.array(
  courseSchema.pick({
    id: true,
    name: true,
  })
);

export type Course = z.infer<typeof courseSchema>;