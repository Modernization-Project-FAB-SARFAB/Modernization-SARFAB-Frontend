import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { returnItem } from "@/api/InventoryAPI";

export function useReturnItem() {
  return useMutation({
    mutationFn: returnItem,
    onError: () => toast.error("Error al devolver el ítem"),
    onSuccess: () => toast.success("Ítem devuelto correctamente"),
  });
}
