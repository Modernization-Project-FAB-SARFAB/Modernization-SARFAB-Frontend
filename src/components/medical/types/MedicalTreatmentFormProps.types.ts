import { MedicalTreatmentFormData } from "@/types/medicalTreatment.schema";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

export interface MedicalTreatmentFormProps {
    errors: FieldErrors<MedicalTreatmentFormData>;
    register: UseFormRegister<MedicalTreatmentFormData>;
    control: Control<MedicalTreatmentFormData>;
}