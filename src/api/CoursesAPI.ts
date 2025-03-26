import api from "../lib/axios";
import { isAxiosError } from "axios";
import { coursesSelect } from '../types/courses.schema.ts'
import { Volunteer } from "@/types/volunteer.schema.ts";

export async function getCoursesSelect(volunteerId?: Volunteer['id']) {
    try {
        const { data } = await api.get('/Course/courses-select', {
            params: { volunteerId }, 
        });
        
        const response = coursesSelect.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if (error.response.status === 404) {
                return [];
            }
            throw new Error(error.response.data.error);
        }
    }
}
