import { useMutation } from "@tanstack/react-query";
import { createRecruitment } from "@/api/RecruitmentAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useCreateRecruit() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createRecruitment,
    onError: () => toast.error("Ocurrió un error al registrar el recluta"),
    onSuccess: (data) => {
      toast.success("Recluta registrado correctamente");
      navigate(`/recruitment/approve-or-deny?continue-afiliation=true&recruitId=${data.id}`);
    },
  });
}
