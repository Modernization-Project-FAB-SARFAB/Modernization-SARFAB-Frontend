import { statusChangeVolunteer } from "@/api/VolunteerAPI";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDischargeVolunteer() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: statusChangeVolunteer,
    onError: (error) => {
      const errorMessage = error.message?.trim() || "Ocurrió un error al dar de baja al voluntario";
      toast.error(errorMessage);
    },
    onSuccess: () => {
      toast.success("Voluntario ha sido dado de baja correctamente");
      navigate("/volunteers/volunteer-history");
    },
  });
}