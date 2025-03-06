import { useMutation } from "@tanstack/react-query";
import { updateRecruitStatus } from "@/api/RecruitmentAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useUpdateRecruitStatus() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updateRecruitStatus,
    onError: () => {
      toast.error("Ocurrió un error al actualizar el estado del recluta.");
    },
    onSuccess: (_, { status }) => {
      toast.success(`El recluta ha sido ${status === 2 ? "aprobado" : "rechazado"} correctamente.`);
      navigate("/recruitment/list");
    },
  });
}
