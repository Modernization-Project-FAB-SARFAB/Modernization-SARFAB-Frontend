import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { VolunteerFormData } from "@/types/volunteer.schema";

export async function createVolunteer(formData: VolunteerFormData) {
    try {
        const { data } = await api.post('/Volunteer', formData)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}