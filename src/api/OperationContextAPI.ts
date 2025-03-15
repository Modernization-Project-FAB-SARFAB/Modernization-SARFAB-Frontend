import api from "@/lib/axios";
import { CreateOperationContextSchema, MilitaryWithRankSchema, OperationContextSchema, VolunteerWithRankSchema } from "@/types/operationContext.schema";
import { isAxiosError } from "axios";

// Obtener información de contexto para filtro de operaciones
export async function getOperationContext() {
  try {
    const { data } = await api.get("/ContextData/operation-list-filter");
    return OperationContextSchema.parse(data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Error fetching operation context");
    }
    throw error;
  }
}

// Obtener información de contexto para creación de operaciones
export async function getCreateOperationContext(){
  try {
    const { data } = await api.get("/ContextData/operation-context");
    return CreateOperationContextSchema.parse(data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Error fetching operation context");
    }
    throw error;
  }

}

export async function getVolunteersWithGrade(){
  try {
    const { data } = await api.get("/ContextData/volunteers-with-rank");
    return VolunteerWithRankSchema.array().parse(data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Error fetching volunteers with grade");
    }
    throw error;
  }
}

export async function getMilitaryWithRank() {
  try {
    const { data } = await api.get("/ContextData/military-personnel-with-rank");
    return MilitaryWithRankSchema.array().parse(data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Error fetching military with rank");
    }
    throw error;
  }
}
