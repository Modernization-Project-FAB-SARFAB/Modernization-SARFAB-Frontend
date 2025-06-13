import { deleteDemeritPoint } from "@/api/VolunteerDemeritPoint";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteDemeritPoint() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteDemeritPoint,
    onError: (error) => {
      const errorMessage = error.message?.trim() || "Ocurrió un error al eliminar la falta";
      toast.error(errorMessage);
      navigate(-1);
    },
    onSuccess: () => {
      toast.success("Falta eliminada correctamente");
      navigate(-1);
    },
  });
}
