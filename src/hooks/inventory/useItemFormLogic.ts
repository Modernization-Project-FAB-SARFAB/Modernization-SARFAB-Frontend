import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CreateItemForm, UpdateItemForm } from "@/types/invetory.schema";
import { useItemById } from "@/hooks/inventory/querys/useItemById";
import { useCreateItem } from "@/hooks/inventory/mutations/useCreateItem";
import { useUpdateItem } from "@/hooks/inventory/mutations/useUpdateItem";
import { useQueryClient } from "@tanstack/react-query";

interface UseItemFormLogicProps {
  isOpen: boolean;
  onClose: () => void;
  itemId?: number;
}

export function useItemFormLogic({ isOpen, onClose, itemId }: UseItemFormLogicProps) {
  const form = useForm<CreateItemForm>();
  const queryClient = useQueryClient();
  const { data: itemData, isLoading } = useItemById(itemId || 0);
  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();

  useEffect(() => {
    if (isOpen && itemData && itemId) {
      form.reset({
        name: itemData.name,
        quantity: itemData.quantity,
      });
    }
  }, [isOpen, itemData, itemId, form]);

  const handleFormSubmit = async (formData: CreateItemForm) => {
    if (itemId) {
      await updateMutation.mutateAsync({ id: itemId, formData: formData as UpdateItemForm });
    } else {
      await createMutation.mutateAsync(formData);
    }
    queryClient.invalidateQueries({ queryKey: ["inventory-items"] });
    onClose();
  };

  return {
    isLoading,
    handleFormSubmit,
    formProps: {
      form,
    },
  };
}
