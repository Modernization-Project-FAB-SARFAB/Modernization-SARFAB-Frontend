import { z } from 'zod';

export const volunteerSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    homeAddress: z.string(),
    ci: z.string().regex(/^\d+$/, "CI must be a numeric string"),
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
    phone: z.string(),
    mobilePhone: z.string(),
    email: z.string().email("Invalid email format"),
    distinctiveFeatures: z.string(),
    volunteerType: z.string(),
    occupation: z.string(),
    bloodType: z.string(),
    religion: z.string(),
    allergies: z.string(),
    emergencyContactFullName: z.string(),
    emergencyContactRelation: z.string(),
    emergencyContactAddress: z.string(),
    emergencyContactPhone: z.string(),
    emergencyContactMobile: z.string(),
    departmentId: z.number(),
    gradeId: z.number(),
    checkupDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
    expirationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
    observations: z.string(),
});

export const listVolunteerActiveSchema = z.object({
    data: z.array(
        volunteerSchema.pick({
            id: true,
            lastName: true,
            ci: true,
            mobilePhone: true,
            email: true
        }).extend({
            name: volunteerSchema.shape.firstName,
            gradeName: z.string(),
        })
    ),
    totalPages: z.number(),
});

export type Volunteer = z.infer<typeof volunteerSchema>;

export type VolunteerFormData = Pick<Volunteer, 'firstName' | 'lastName' | 'homeAddress' | 'ci' | 'birthDate' | 'phone' | 'mobilePhone' | 'email' | 'distinctiveFeatures' | 'volunteerType' | 'occupation' | 'bloodType' | 'religion' | 'allergies' | 'emergencyContactFullName' | 'emergencyContactRelation' | 'emergencyContactAddress' | 'emergencyContactPhone' | 'emergencyContactMobile' | 'departmentId' | 'gradeId' | 'checkupDate' | 'expirationDate' | 'observations'>;
