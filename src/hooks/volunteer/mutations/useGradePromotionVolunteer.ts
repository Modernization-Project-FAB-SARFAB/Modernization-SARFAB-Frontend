import { gradePromotionVolunteer } from "@/api/VolunteerAPI";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useGradePromotionVolunteer() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: gradePromotionVolunteer,
    onError: (error) => {
      const errorMessage = error.message?.trim() || "Ocurrió un error al promover al voluntario";
      toast.error(errorMessage);
      navigate("/volunteers/active-volunteers");
    },
    onSuccess: () => {
      toast.success("Voluntario promovido correctamente");
      navigate("/volunteers/active-volunteers");
    },
  });
}
