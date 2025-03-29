import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUpdateStatusPersonOperation } from "./useUpdateStatusPersonOperation";
import { useCreateDemeritPoint } from "./useCreateDemeritPoint";
import { UpdatePersonStatusForm } from "@/types/operation.schema";
import { DemeritPoint } from "@/types/demeritPoint.schema";

export function useRegisterDemeritAndUpdateStatus() {
  const updateStatusMutation = useUpdateStatusPersonOperation();
  const createDemeritMutation = useCreateDemeritPoint();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ statusData, demeritData }: { statusData: UpdatePersonStatusForm; demeritData: DemeritPoint }) => {
      try {
        await createDemeritMutation.mutateAsync(demeritData);

        await updateStatusMutation.mutateAsync(statusData);
      } catch (error) {
        console.error("❌ Error en la transacción:", error);
        throw new Error("Error al registrar demérito y actualizar estado");
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["operationAbsence"] }),
        queryClient.invalidateQueries({ queryKey: ["demeritPoints"] }),
      ]);
    },
  });
}

