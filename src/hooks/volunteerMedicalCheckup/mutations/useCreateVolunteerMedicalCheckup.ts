import { createMedicalCheckup } from "@/api/VolunteerMedicalCheckupAPI";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useCreateVolunteerMedicalCheckup() {
    const navigate = useNavigate();
  
    return useMutation({
      mutationFn: createMedicalCheckup,
      onError: () => toast.error("Ocurrió un error al añadir chequeo médico"),
      onSuccess: (data) => {
        toast.success(data.message);
        navigate(-1);
      },
    });
  }