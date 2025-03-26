import api from "@/lib/axios";
import { CourseVolunteer } from "@/types/courseVolunteer.schema";
import { isAxiosError } from "axios";

export async function assignCourseVolunteer(formData : CourseVolunteer) {
    try {
        const { data } = await api.post(`/Course/assign-course`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
