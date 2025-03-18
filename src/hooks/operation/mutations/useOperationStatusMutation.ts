import { updateOperationStatus } from '@/api/OperationAPI';
import { UpdateOperationStatusForm } from '@/types/operation.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
export function useOperationStatusMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ formData, id }: { formData: UpdateOperationStatusForm; id: number }) => {
      console.log("Enviando datos a la API:", { formData, id });
      return updateOperationStatus(formData, id);
    },
    
    onError: () => toast.error("Ocurrió un error al actualizar el estado de la operación"),
    onSuccess: () => {
      toast.success("Estado de la operación actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ["operation"] });
    },
  });
}