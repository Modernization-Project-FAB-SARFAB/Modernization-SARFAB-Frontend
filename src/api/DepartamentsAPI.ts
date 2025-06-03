import api from "@/lib/axios";
import { listDepartments } from "@/types/departments.schema";
import { isAxiosError } from "axios";

export async function getDepartaments() {
    try {
        const { data } = await api.get('/ContextData/departments')
        const response = listDepartments.safeParse(data);
        if (response.success) {
            return response.data.map(dept => ({
                id: dept.departmentId,
                name: dept.name
            }));
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}