import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateItemForm } from "@/types/invetory.schema";
import FormInput from "@/components/common/FormInput/FormInput";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";

interface ItemFormProps {
  form: UseFormReturn<CreateItemForm>;
  onSubmit: (data: CreateItemForm) => Promise<void>;
  isLoading: boolean;
  onClose: () => void;
  itemId?: number;
}

export function ItemForm({
  form,
  onSubmit,
  isLoading,
  onClose,
  itemId,
}: ItemFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (data: CreateItemForm) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await onSubmit(data);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-8 space-y-4">
      <FormInput
        label="Nombre del elemento"
        name="name"
        type="text"
        register={register}
        placeholder="Ingresa el nombre del elemento"
      />
      {errors.name && (
        <ErrorFormMessage>{errors.name.message}</ErrorFormMessage>
      )}

      <FormInput
        label="Cantidad del elemento"
        name="quantity"
        type="number"
        register={register}
        placeholder="Cantidad disponible"
      />
      {errors.quantity && (
        <ErrorFormMessage>{errors.quantity.message}</ErrorFormMessage>
      )}

      <div className="pt-6">
        <ButtonGroup
          buttons={[
            {
              type: "button",
              label: itemId ? "Guardar" : "Registrar",
              onClick: handleSubmit(handleFormSubmit),
              variant: "primary",
              isLoading: isLoading || isSubmitting,
              disabled: isLoading || isSubmitting,
            },
            {
              type: "button",
              label: "Cancelar",
              onClick: onClose,
              variant: "secondary",
              disabled: isLoading || isSubmitting,
            },
          ]}
        />
      </div>
    </form>
  );
}
