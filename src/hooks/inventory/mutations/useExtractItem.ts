import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { extractItem } from "@/api/InventoryAPI";

export function useExtractItem() {
  return useMutation({
    mutationFn: extractItem,
    onError: () => toast.error("Error al extraer el ítem"),
    onSuccess: () => toast.success("Ítem extraído correctamente"),
  });
}
