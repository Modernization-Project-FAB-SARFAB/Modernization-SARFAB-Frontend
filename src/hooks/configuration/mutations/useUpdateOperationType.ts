import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOperationType } from "@/api/OperationAndTypesAPI";
import { UpdateOperationTypeForm } from "@/types/operationAndType.schema";

interface UpdateOperationTypeParams {
  id: number;
  formData: UpdateOperationTypeForm;
}

export function useUpdateOperationType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: UpdateOperationTypeParams) => 
      updateOperationType(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoriesWithTypes"] });
    },
  });
}
