import { z } from 'zod';
import { isAdult } from '../utils/recruitment/ageValidation';

/** Recruitment */
export const recruitmentSchema = z.object({
    recruitmentId: z.number(),
    firstName: z.string().min(1, "El nombre es obligatorio"),
    lastName: z.string().min(1, "El apellido es obligatorio"),
    ci: z.string().min(1, "El documento de identidad es obligatorio"),
    birthDate:  z.string(),
    wantsMilitaryService: z.boolean(),
    status: z.number()
})


export const listRecruitmentSchema = z.object({
    data: z.array(
      recruitmentSchema.pick({
        recruitmentId: true,
        firstName: true,
        lastName: true,
        ci: true,
        birthDate: true,
        wantsMilitaryService: true,
        status: true,
      })
    ),
    totalPages: z.number(),
  });

export type Recruit = z.infer<typeof recruitmentSchema>;
export type RecruitmentFormData = Pick<Recruit, 'firstName' | 'lastName' | 'ci' | 'birthDate' | 'wantsMilitaryService'>
export type RecruitDetails = Pick<Recruit, 'firstName' | 'lastName' | 'ci' | 'birthDate' | 'wantsMilitaryService'>