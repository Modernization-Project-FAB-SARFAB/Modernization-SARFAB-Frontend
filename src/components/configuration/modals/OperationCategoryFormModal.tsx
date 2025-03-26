import { useOperationCategoryFormLogic } from "@/hooks/configuration/useOperationCategoryFormLogic";
import Modal from "@/components/common/Modal/Modal";
import { OperationCategoryForm } from "../forms/OperationCategoryForm";

interface OperationCategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId?: number;
  categoryData?: { name: string };
}

export function OperationCategoryFormModal({
  isOpen,
  onClose,
  categoryId,
  categoryData,
}: OperationCategoryFormModalProps) {
  const { isLoading, handleFormSubmit, formProps } = useOperationCategoryFormLogic({
    isOpen,
    categoryId,
    categoryData,
    onClose,
  });

  return (
    <Modal
      key={categoryId}
      title={
        categoryId
          ? "Editar categoría de operación"
          : "Registrar categoría de operación"
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      {isLoading && !formProps.form ? (
        <div className="p-8 text-center text-gray-500">Cargando datos...</div>
      ) : (
        <OperationCategoryForm
          {...formProps}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          onClose={onClose}
          categoryId={categoryId}
        />
      )}
    </Modal>
  );
}
