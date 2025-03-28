import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { passwordRecoveryByUser } from "@/api/UserAPI";

export function usePasswordRecoveryByUser() {
    return useMutation({
        mutationFn: passwordRecoveryByUser,
        onError: () => toast.error("Ocurrio un error inesperado"),
        onSuccess: () => {
            toast.success("Se restauro su contrseña, revise su correo");
        },
    });
}