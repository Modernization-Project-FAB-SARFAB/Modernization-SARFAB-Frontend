import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateMedicalCheckup } from "@/api/VolunteerMedicalCheckupAPI";

export function useUpdateVolunteerMedicalCheckup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updateMedicalCheckup,
    onError: () => toast.error("Ocurrió un error actualizando el chequeo médico"),
    onSuccess: () => {
      toast.success("Chequeo médico actualizado correctamente");
      navigate(-1);
    },
  });
}
