import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Volunteer } from "../types";

export async function getVolunteerMedicalCheckup(id: Volunteer['id']) {
    try {
        const { data } = await api(`/MedicalCheckup/volunteer-medical-checkups/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
