import { listRecruitmentSchema, Recruit, RecruitmentFormData } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { EditRecruitFormProps } from "@/components/recruitment/types/EditRecruitFormProps.types";
import { RecruitAPIType } from "./types/RecruitAPIType.type";

export async function createRecruitment(formData: RecruitmentFormData) {
    try {
        const { data } = await api.post('/Recruitment', formData)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getRecruitment() {
    try {
        const { data } = await api.get('/Recruitment')
        const response = listRecruitmentSchema.safeParse(data.data);
        if (response.success) {
            return response.data;   
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getRecruitById(id: Recruit['recruitmentId']) {
    try {
        const { data } = await api.get(`/Recruitment/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateRecruit({formData, recruitId}: RecruitAPIType) {
    try {
        const { data } = await api.patch(`/Recruitment/${recruitId}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}