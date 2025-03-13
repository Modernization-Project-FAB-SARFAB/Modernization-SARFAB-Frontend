import api from "@/lib/axios";
import { OperationContext } from "@/types/operationContext.schema";
import { isAxiosError } from "axios";

// Obtener información de contexto para filtro de operaciones
export async function getOperationContext(): Promise<OperationContext> {
  try {
    const { data } = await api.get("/ContextData/operation-list-filter");
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Error fetching operation context");
    }
    throw error;
  }
}
