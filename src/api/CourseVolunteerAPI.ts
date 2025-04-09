import api from "@/lib/axios";
import { CourseVolunteer, lastCourseVolunteer, listVoluntareerCompletedCourses } from "@/types/courseVolunteer.schema";
import { isAxiosError } from "axios";
import { Volunteer } from "../types";

export async function assignCourseVolunteer(formData: CourseVolunteer) {
    try {
        const { data } = await api.post(`/Course/assign-course`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getVolunteerCompletedCourses(id: Volunteer['id'], queryParams?: Record<string, any>) {
    try {
        const { data } = await api(`/Course/volunteer/${id}/completed-courses`, { params: queryParams });
        const response = listVoluntareerCompletedCourses.safeParse(data);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getLastCourseVolunteer(id: Volunteer['id']) {
    try {
        const { data } = await api(`/Course/volunteer-last-course/${id}`);
        const response = lastCourseVolunteer.safeParse(data);
        if (response.success) {
            return response.data;
        } else {
            throw new Error("Formato de datos inválido");
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error desconocido del servidor")
        }
        throw error;
    }
}