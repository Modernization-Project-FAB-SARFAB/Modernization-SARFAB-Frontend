import { z } from 'zod';

const VoluntareeGuarShema = z.object({
    voluntareeId: z.number(),
    voluntareeFullname: z.string(),
    grade: z.string()
});

const baseGuardSchema = z.object({
    guardId: z.number(),
    guardDate: z.string().min(10, "La fecha del tratamiento es obligatoria"),
    shiftId: z.number().min(1, "El turno es obligatorio"),
    shiftName: z.string(),
    responsibleId: z.number().min(1, "El responsable es obligatorio"),
    responsibleFullname: z.string(),
    location: z.string().min(1, "La ubicación es obligatoria"),
    volunteerQuantity: z.number(),
    observation: z.string().nullable().optional(),
    status: z.number(),
    voluntareeGuards: z.array(VoluntareeGuarShema)
});

export const listGuardSchema = z.object({
    data: z.array(baseGuardSchema.omit({ voluntareeGuards: true })),
    totalPages: z.number().optional()
});

export const guardFormDataSchema = baseGuardSchema.pick({
    guardDate: true,
    location: true,
    responsibleId: true,
    shiftId: true
}).extend({
    voluntareeIds: z.array(z.number().min(1, "Cada voluntario debe tener un ID válido")).min(1, "La lista de voluntarios es requerida")
}).refine(data => {
    return !data.voluntareeIds.includes(data.responsibleId);
}, {
    message: "El responsable no puede estar en la lista de voluntarios",
    path: ["voluntareeIds"]
});

const shiftSchema = z.object({
    shiftId: z.number(),
    name: z.string(),
});

export const listShiftSchema = z.array(shiftSchema);

export type Guard = z.infer<typeof baseGuardSchema>;
export type GuardFormData = z.infer<typeof guardFormDataSchema>;

