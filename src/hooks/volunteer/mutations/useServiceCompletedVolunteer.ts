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
      navigate(-1);
    },
    onSuccess: () => {
      toast.success("Voluntario ha sido marcado como cumplido el servicio correctamente");
      //navigate(`/volunteers/${id}/view?historicalData=true`);
      navigate("/volunteers/volunteer-history");
    },
  });
}