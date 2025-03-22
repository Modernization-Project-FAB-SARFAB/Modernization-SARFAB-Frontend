import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { InventoryMovementForm } from "@/types/invetory.schema";
import FormInput from "@/components/common/FormInput/FormInput";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";
import FilterDatalist from "@/components/common/FilterDatalist/FilterDatalist";
import { useVolunteersWithRank } from "@/hooks/inventory/querys/useVolunteersWithRank";
import { usePendingReturnsByItemId } from "@/hooks/inventory/querys/usePendingReturnsByItemId";
import { VolunteerPendingReturn } from "@/types/invetory.schema";
import { VolunteerWithRank } from "@/types/operationContext.schema";

interface ItemMovementFormProps {
  form: UseFormReturn<InventoryMovementForm>;
  onSubmit: (data: InventoryMovementForm) => Promise<void>;
  isLoading: boolean;
  onClose: () => void;
  itemId: number;
  isReturn: boolean;
}

export function ItemMovementForm({
  form,
  onSubmit,
  isLoading,
  onClose,
  itemId,
  isReturn,
}: ItemMovementFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: pendingReturns = [] } = usePendingReturnsByItemId(itemId);
  const { data: allVolunteers = [] } = useVolunteersWithRank({ enabled: !isReturn });

  const volunteers = isReturn ? pendingReturns : allVolunteers;

  const volunteerId = watch("volunteerId");

  const selected = volunteers.find((v) => v.volunteerId === volunteerId);
  const displayName = selected
    ? isReturn
      ? (selected as VolunteerPendingReturn).volunteerWithGrade
      : `${(selected as VolunteerWithRank).abbreviation} - ${(selected as VolunteerWithRank).lastName} ${(selected as VolunteerWithRank).firstName}`
    : "";

  const handleFormSubmit = async (data: InventoryMovementForm) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await onSubmit(data);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-8 space-y-4">
      <FilterDatalist
        name="volunteerId"
        label="Voluntario"
        options={volunteers.map((v) => ({
          id: v.volunteerId,
          name: isReturn
            ? (v as VolunteerPendingReturn).volunteerWithGrade
            : `${(v as VolunteerWithRank).abbreviation} - ${(v as VolunteerWithRank).lastName} ${(v as VolunteerWithRank).firstName}`,
        }))}
        value={displayName}
        onChange={(value) => {
          const selected = volunteers.find((v) => {
            const name = isReturn
              ? (v as VolunteerPendingReturn).volunteerWithGrade
              : `${(v as VolunteerWithRank).abbreviation} - ${(v as VolunteerWithRank).lastName} ${(v as VolunteerWithRank).firstName}`;
            return name === value;
          });
          setValue("volunteerId", selected?.volunteerId ?? 0);
        }}
      />
      {errors.volunteerId && (
        <ErrorFormMessage>{errors.volunteerId.message}</ErrorFormMessage>
      )}

      <FormInput
        label="Cantidad"
        name="quantity"
        type="number"
        register={register}
        placeholder="Cantidad"
      />
      {errors.quantity && (
        <ErrorFormMessage>{errors.quantity.message}</ErrorFormMessage>
      )}

      <div className="pt-6">
        <ButtonGroup
          buttons={[
            {
              type: "button",
              label: isReturn ? "Registrar devolución" : "Registrar extracción",
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
