import { MedicalTreatmentFormData } from "@/types/medical";
import { useForm } from "react-hook-form";

export function useMedicalTreatmentForm(defaultValues: MedicalTreatmentFormData) {
    return useForm<MedicalTreatmentFormData>({
        defaultValues,
    });
}