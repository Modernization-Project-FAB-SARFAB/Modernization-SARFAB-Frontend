import { z } from 'zod';

// Función para formatear fecha a dd/mm/yyyy
const formatDate = (date: unknown) => {
    if (typeof date === "string" || date instanceof Date) {
        const parsedDate = new Date(date);
        const day = parsedDate.getDate().toString().padStart(2, '0');
        const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0'); // Meses van de 0-11
        const year = parsedDate.getFullYear();
        return `${day}/${month}/${year}`;
    }
    return date;
};

export const medicalTreatmentSchema = z.object({
    medicalTreatmentId: z.number(),
    treatmentDate: z.preprocess(formatDate, z.string().min(1, "La fecha del tratamiento es obligatorio")),
    diagnosis: z.string().min(1, "El diagnóstico es obligatorio"),
    description: z.string().min(1, "El diagnóstico es obligatorio"),
    attendingPersonId: z.number().min(1, "Es obligatorio seleccionar la persona que atendió"),
    attendingPersonFullname: z.string(),
    patientPersonId: z.number().min(1, "Es obligatorio seleccionar la persona atendida"),
    patientPersonFullname: z.string(),
});


export const listMedicalTreatmentSchema = z.object({
    data: z.array(medicalTreatmentSchema),
    totalPages: z.number().optional()
});

export type MedicalTreatment = z.infer<typeof medicalTreatmentSchema>;
export type MedicalTreatmentFormData = Pick<MedicalTreatment, 'treatmentDate' | 'diagnosis' | 'description' | 'attendingPersonId' | 'patientPersonId'>
export type MedicalTreatmentDetails = Pick<MedicalTreatment, 'treatmentDate' | 'diagnosis' | 'description' | 'attendingPersonId' | 'patientPersonId'>