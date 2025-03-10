import { useMutation, useQueryClient } from "@tanstack/react-query";
import { promoteMilitary } from "@/api/MilitaryAPI";
import toast from "react-hot-toast";

export function useMilitaryPromotionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: promoteMilitary,
    onSuccess: (data) => {
      if (data.canPromote) {
        toast.success(data.message || "Ascenso exitoso");
      } else {
        toast.error(data.message || "No se pudo ascender al militar");
      }
      queryClient.invalidateQueries({ queryKey: ["military"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
