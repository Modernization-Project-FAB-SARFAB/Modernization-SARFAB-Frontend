import { useItemFormLogic } from "@/hooks/inventory/useItemFormLogic";
import Modal from "@/components/common/Modal/Modal";
import { ItemForm } from "../forms/ItemForm";

interface ItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId?: number;
}

export function ItemFormModal({
  isOpen,
  onClose,
  itemId,
}: ItemFormModalProps) {
  const { isLoading, handleFormSubmit, formProps, assignedQuantity } = useItemFormLogic({
    isOpen,
    itemId,
    onClose,
  });

  return (
    <Modal
      key={itemId}
      title={
        itemId
          ? "Editar elemento"
          : "Registrar elemento en inventario"
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      {isLoading ? (
        <div className="p-8 text-center text-gray-500">Cargando datos...</div>
      ) : (
        <ItemForm
          {...formProps}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          onClose={onClose}
          itemId={itemId}
          assignedQuantity={assignedQuantity}
        />
      )}
    </Modal>
  );
}
