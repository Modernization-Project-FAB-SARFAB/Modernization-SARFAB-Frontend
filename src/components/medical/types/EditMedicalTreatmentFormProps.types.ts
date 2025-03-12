import { MedicalTreatmentFormData } from "@/types/medicalTreatment.schema";
import { Control, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

export interface EditMedicalTreatmentFormProps {
    errors: FieldErrors<MedicalTreatmentFormData>;
    register: UseFormRegister<MedicalTreatmentFormData>;
    control: Control<MedicalTreatmentFormData>;
    watch: UseFormWatch<MedicalTreatmentFormData>
    readonly: boolean;
}