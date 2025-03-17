import { useQuery } from "@tanstack/react-query";
import { getOperationById } from "@/api/OperationAPI";
import { OperationDetailResponse } from "@/types/operation.schema";

export function useGetOperationDetail(id: number) {
  return useQuery<OperationDetailResponse>({
    queryKey: ["operationDetail", id],
    queryFn: () => getOperationById(id),
    enabled: Boolean(id),
  });
}
