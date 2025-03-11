import { MedicalTreatment, MedicalTreatmentFormData } from "@/types/medical"

export type MedicalTreatmentAPIType = {
    formData: MedicalTreatmentFormData,
    medicalTreatmentId: MedicalTreatment['medicalTreatmentId']
}