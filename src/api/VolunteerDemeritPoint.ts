import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { totalPointsLostSchema, Volunteer } from "../types";

export async function getVolunteerTotalDemeritPoint(id: Volunteer['id']) {
    try {
        const { data } = await api.get(`/DemeritPoint/volunteer-total-points/${id}`)
        const response = totalPointsLostSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}