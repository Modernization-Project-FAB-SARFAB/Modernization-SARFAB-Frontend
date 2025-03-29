import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Modal from "@/components/common/Modal/Modal";
import { ItemMovementForm } from "../forms/ItemMovementForm";
import { InventoryMovementForm } from "@/types/invetory.schema";

interface ItemMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (data: InventoryMovementForm) => void;
  isLoading: boolean;
  itemId: number;
  isReturn: boolean;
}

export function ItemMovementModal({
  isOpen,
  onClose,
  title,
  onSubmit,
  isLoading,
  itemId,
  isReturn,
}: ItemMovementModalProps) {
  const form = useForm<InventoryMovementForm>();

  useEffect(() => {
    if (itemId) {
      form.setValue("itemId", itemId);
    }
  }, [itemId, form]);

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      {isLoading ? (
        <div className="p-8 text-center text-gray-500">Cargando datos...</div>
      ) : (
        <ItemMovementForm
          form={form}
          onSubmit={async (data) => await onSubmit(data)}
          isLoading={isLoading}
          onClose={onClose}
          itemId={itemId}
          isReturn={isReturn}
        />
      )}
    </Modal>
  );
}
