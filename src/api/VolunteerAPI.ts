import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { listVolunteerActiveSchema, listVolunteerHistoricalSchema, VolunteerFormData } from "@/types/volunteer.schema";

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

export async function getVolunteerActiveList(queryParams?: Record<string, any>) {
    try {
        const { data } = await api.get('/Volunteer/active-volunteers', { params: queryParams })
        const response = listVolunteerActiveSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getVolunteerHistoricalList(queryParams?: Record<string, any>) {
    try {
        const { data } = await api.get('/Volunteer/historical-list', { params: queryParams })
        console.log(data);

        const response = listVolunteerHistoricalSchema.safeParse(data);
        console.log(response);

        if (response.success) {
            console.log('holo');

            console.log(response);

            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}