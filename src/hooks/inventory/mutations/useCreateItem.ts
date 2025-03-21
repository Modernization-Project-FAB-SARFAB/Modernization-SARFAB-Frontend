import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createItem } from "@/api/InventoryAPI";

export function useCreateItem() {
  return useMutation({
    mutationFn: createItem,
    onError: () => toast.error("Ocurrió un error al registrar el ítem"),
    onSuccess: () => toast.success("Ítem registrado correctamente"),
  });
}
