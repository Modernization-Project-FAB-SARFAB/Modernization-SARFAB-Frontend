import { updatePersonStatusOperation } from "@/api/OperationAPI";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UpdatePersonStatusForm } from '@/types/operation.schema';

export function useUpdateStatusPersonOperation() {
  return useMutation({
      mutationFn: async (formData: UpdatePersonStatusForm) => {
          return await updatePersonStatusOperation(formData);
      },
      onSuccess: () => toast.success("Asistencia del voluntario registrada correctamente"),
      onError: () => toast.error("Ocurrió un error al registrar la asistencia del voluntario"),
  });
}
