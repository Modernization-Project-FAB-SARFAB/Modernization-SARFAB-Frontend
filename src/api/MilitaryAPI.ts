import { ListMilitarySchema, Military, CreateMilitaryForm } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { MilitaryAPIType, MilitaryStatusAPIType } from "./types/MilitaryAPIType.type";

export async function createMilitary(formData: CreateMilitaryForm) {
    try {
        const { data } = await api.post('/Military', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getMilitary(queryParams?: Record<string, any>) {
  try {
      if (queryParams?.rankFilter) {
          queryParams.rankId = Number(queryParams.rankFilter);
          delete queryParams.rankFilter;
      }
      const { data } = await api.get('/Military/active-militaries', { params: queryParams });
      const response = ListMilitarySchema.safeParse(data);
      if (response.success) {
          return response.data;
      }
  } catch (error) {
      if (isAxiosError(error) && error.response) {
          throw new Error(error.response.data.error);
      }
  }
}

export async function getMilitaryById(id: Military['id']) {
    try {
        const { data } = await api.get(`/Military/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateMilitary({ formData, militaryId }: MilitaryAPIType) {
    try {
        const { data } = await api.patch(`/Military/${militaryId}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateMilitaryStatus({ militaryId, status }: MilitaryStatusAPIType) {
    try {
        const { data } = await api.patch(`/Military/${militaryId}/status`, { status });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getMilitaryRanks() {
  try {
      const { data } = await api.get('/Military/ranks');
      if (!Array.isArray(data)) throw new Error("Invalid response format");
      return data.map((rank: { id: number; name: string }) => ({
          value: rank.id,  
          label: rank.name,
          isSelected: false
      }));
  } catch (error) {
      if (isAxiosError(error) && error.response) {
          throw new Error(error.response.data.error);
      }
  }
}

