import { endGuard } from "@/api/GuardAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useEndGuard() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: endGuard,
        onError: () => toast.error("Ocurrió un error al finalizar la guardia"),
        onSuccess: () => {
            toast.success("Guardia finalizada correctamente");
            queryClient.invalidateQueries({ queryKey: ['guard'] });
        },
    });
}