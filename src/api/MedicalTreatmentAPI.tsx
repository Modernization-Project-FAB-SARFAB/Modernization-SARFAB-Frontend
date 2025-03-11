import { MedicalTreatment, MedicalTreatmentFormData, listMedicalTreatmentSchema } from "@/types/medical";
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { MedicalTreatmentAPIType } from "./types/MedicalTreatmentAPIType.type";

export async function createMedicalTreatment(formData: MedicalTreatmentFormData) {
    try {
        const { data } = await api.post('/MedicalTreatment', formData)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getMedicalTreatment(queryParams?: Record<string, any>) {
    try {
        const { data } = await api.get('/MedicalTreatment', { params: queryParams })
        const response = listMedicalTreatmentSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getMedicalTreatmentById(id: MedicalTreatment['medicalTreatmentId']) {
    try {
        const { data } = await api(`/MedicalTreatment/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateMedicalTreatment({ formData, medicalTreatmentId }: MedicalTreatmentAPIType) {
    try {
        const completeFormData = { treatmentID: medicalTreatmentId, ...formData }
        const { data } = await api.put(`/MedicalTreatment`, completeFormData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}