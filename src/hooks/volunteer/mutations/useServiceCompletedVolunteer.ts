import { statusChangeVolunteer } from "@/api/VolunteerAPI";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useServiceCompletedVolunteer() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: statusChangeVolunteer,
    onError: (error) => {
      const errorMessage = error.message?.trim() || "Ocurrió un error marcar como cumplido el servicio del voluntario";
      toast.error(errorMessage);
      navigate("/volunteers/active-volunteers");
    },
    onSuccess: () => {
      toast.success("Voluntario ha sido marcado como cumplido el servicio correctamente");
      navigate("/volunteers/active-volunteers");
    },
  });
}