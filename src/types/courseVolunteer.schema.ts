import { z } from "zod";

export const assignCourseSchema = z.object({
  volunteerId: z.number().int().nonnegative(),
  courseId: z.union([z.string(), z.number()]).refine(value => {
    if (typeof value === 'string') {
      return /^[A-Za-z0-9]+$/.test(value); 
    }
    return true;
  }, {
    message: "courseId debe ser un número o una cadena de texto válida",
  }),
  completionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
    const completionDate = new Date(value);
    const currentDate = new Date();
    return completionDate <= currentDate; // Verifica que la fecha no sea posterior a la actual
  }, {
    message: "completionDate no puede ser una fecha posterior a la actual",
  }),
});

export const volunteerCompletedCourse = z.object({
  courseName: z.string(),
  completionDate: z.string(),
  description: z.string(),
});

export const voluntareerCompletedCourses = z.object({
    data: z.array(assignCourseSchema),
    totalPages: z.number().int(),
});

export type CourseVolunteer = z.infer<typeof assignCourseSchema>;
export type VolunteerCompletedCourse = z.infer<typeof voluntareerCompletedCourses>;