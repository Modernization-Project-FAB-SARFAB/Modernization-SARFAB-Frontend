import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOperationType } from "@/api/OperationAndTypesAPI";
import { CreateOperationTypeForm } from "@/types/operationAndType.schema";

export function useCreateOperationType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOperationTypeForm) => createOperationType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoriesWithTypes"] });
    },
  });
}
