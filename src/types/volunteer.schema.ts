import { z } from 'zod';

export const baseVolunteerSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    homeAddress: z.string(),
    ci: z.string().regex(/^[a-zA-Z0-9]+$/, "CI puede ser alfanumérico"),
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha invalido"),
    phone: z.string().regex(/^\d{7,15}$/, "Número de teléfono inválido"),
    mobilePhone: z.string().regex(/^\d{7,15}$/, "Número de celular inválido"),
    email: z.string().email("Formato de correo invalido"),
    distinctiveFeatures: z.string(),
    volunteerType: z.string(),
    occupation: z.string(),
    bloodType: z.string(),
    religion: z.string(),
    allergies: z.string(),
    emergencyContactFullName: z.string(),
    emergencyContactRelation: z.string(),
    emergencyContactAddress: z.string(),
    emergencyContactPhone: z.string().regex(/^\d{7,15}$/, "Número de celular inválido"),
    emergencyContactMobile: z.string().regex(/^\d{7,15}$/, "Número de celular inválido"),
    departmentId: z.number(),
    gradeId: z.number(),
    checkupDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha invalido"),
    expirationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha invalido"),
    observations: z.string(),
});

export const listVolunteerActiveSchema = z.object({
    data: z.array(
        baseVolunteerSchema.pick({
            id: true,
            lastName: true,
            ci: true,
            mobilePhone: true,
            email: true
        }).extend({
            name: baseVolunteerSchema.shape.firstName,
            gradeName: z.string(),
        })
    ),
    totalPages: z.number(),
});


export const listVolunteerHistoricalSchema = z.object({
    data: z.array(
        baseVolunteerSchema.pick({
            lastName: true,
        }).extend({
            volunteerId: z.number(),
            name: baseVolunteerSchema.shape.firstName,
            gradeName: z.string(),
            dapartureDate: z.string(),
            reason: z.string().nullish(),
            volunteerStatus: z.number()
        })
    ),
    totalPages: z.number(),
});

export const volunteerFormSchema = z.object(
    Object.fromEntries(
        Object.entries(baseVolunteerSchema.omit({ id: true })._def.shape()).map(
            ([key, field]) => {
                if (field instanceof z.ZodString) {
                    return [key, field.min(1, "Este campo es requerido")];
                } else if (field instanceof z.ZodNumber) {
                    return [key, field.min(1, "Este campo es requerido")];
                }
                return [key, field];
            }
        )
    )
).refine(
    (data) => new Date(data.checkupDate) <= new Date(data.expirationDate),
    {
        message: "La fecha de chequeo no puede ser mayor que la fecha de expiración",
        path: ["checkupDate"],
    }
);


export type Volunteer = z.infer<typeof baseVolunteerSchema>;

export type VolunteerFormData = Pick<Volunteer, 'firstName' | 'lastName' | 'homeAddress' | 'ci' | 'birthDate' | 'phone' | 'mobilePhone' | 'email' | 'distinctiveFeatures' | 'volunteerType' | 'occupation' | 'bloodType' | 'religion' | 'allergies' | 'emergencyContactFullName' | 'emergencyContactRelation' | 'emergencyContactAddress' | 'emergencyContactPhone' | 'emergencyContactMobile' | 'departmentId' | 'gradeId' | 'checkupDate' | 'expirationDate' | 'observations'>;
