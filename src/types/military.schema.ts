import { z } from 'zod';

export enum StatusEnum {
  Disabled = 0,
  Enabled = 1,
}

const BaseMilitarySchema = z.object({
    id: z.number(),  
    firstName: z.string().min(1, 'Este campo es requerido').max(50, 'El nombre no puede tener más de 50 caracteres'),
    lastName: z.string(),
    mobilePhone: z.string().nullable(),
    militaryRankId: z.number().optional(),
    rankName: z.string().optional(),
    status: z.nativeEnum(StatusEnum),
});

export const MilitarySchema = BaseMilitarySchema;
export const CreateMilitarySchema = BaseMilitarySchema.omit({ id: true, status: true });
export const UpdateMilitarySchema = BaseMilitarySchema.partial().omit({ id: true, status: true });

export const ListMilitarySchema = z.object({
    data: z.array(MilitarySchema),
    totalPages: z.number(),
});

export type Military = z.infer<typeof MilitarySchema>;
export type CreateMilitaryForm = z.infer<typeof CreateMilitarySchema>;
export type UpdateMilitaryForm = z.infer<typeof UpdateMilitarySchema>;
export type ListMilitaryResponse = z.infer<typeof ListMilitarySchema>;
