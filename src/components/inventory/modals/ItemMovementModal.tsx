import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/common/Modal/Modal";
import { ItemMovementForm } from "../forms/ItemMovementForm";
import { InventoryMovementForm, InventoryMovementSchema } from "@/types/invetory.schema";
import { useInventoryItemById } from "@/hooks/inventory/querys/useInventoryItemById";
import { useItemOwedQuantityByVolunteer } from "@/hooks/inventory/querys/useItemOwedQuantityByVolunteer";
import Loader from "@/components/common/Loader";
import Spinner from "@/components/common/Spinner/Spinner";

interface ItemMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InventoryMovementForm) => void;
  isLoading: boolean;
  itemId: number;
  isReturn: boolean;
}

export function ItemMovementModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  itemId,
  isReturn,
}: ItemMovementModalProps) {
  const { data: inventoryItem, isLoading: isLoadingItem } = useInventoryItemById(itemId);
  const availableQuantity = inventoryItem?.availableQuantity || 0;
  const form = useForm<InventoryMovementForm>({
    resolver: zodResolver(InventoryMovementSchema),
    defaultValues: {
      itemId: 0,
      volunteerId: undefined as unknown as number,
      quantity: undefined as unknown as number
    }
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        itemId: itemId,
        volunteerId: undefined as unknown as number,
        quantity: undefined as unknown as number
      });
    }
  }, [isOpen, itemId, form]);

  useEffect(() => {
    if (itemId) {
      form.setValue("itemId", itemId);
    }
  }, [itemId, form]);

  const volunteerId = form.watch("volunteerId");

  const { data: owedQuantity = 0, isLoading: isLoadingOwedQuantity } = 
    useItemOwedQuantityByVolunteer(volunteerId, itemId);
    const modalTitle = (
      <>
        {isReturn ? "Registrar devolución de" : "Registrar extracción de"}:{" "}
        {!inventoryItem?.name ? <Spinner size={16} /> : inventoryItem.name}
      </>
    );

  return (
    <Modal title={modalTitle} isOpen={isOpen} onClose={onClose}>
      {isLoadingItem || isLoadingOwedQuantity ? (
        <Loader message="Cargando datos previos para el movimiento del elemento" />
      ) : (
        <ItemMovementForm
          form={form}
          onSubmit={async (data) => {
            if (!isReturn && Number(data.quantity) > availableQuantity) {
              return;
          }
          
          if (isReturn && Number(data.quantity) > owedQuantity) {
            return;
          }
          
          await onSubmit(data);
        }}
        isLoading={isLoading}
        isLoadingItem={isLoadingItem}
        isLoadingOwedQuantity={isReturn ? isLoadingOwedQuantity : false}
        onClose={onClose}
        itemId={itemId}
        isReturn={isReturn}
        availableQuantity={availableQuantity}
        owedQuantity={owedQuantity}
      />
      )}
    </Modal>
  );
}
