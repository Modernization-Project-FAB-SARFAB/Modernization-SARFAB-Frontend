import { useCallback, useMemo, useState, ChangeEvent } from "react";
import Modal from "@/components/common/Modal/Modal";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import { RiArrowUpCircleFill } from "@remixicon/react";
import { useOperationStatusMutation } from "@/hooks/operation/mutations/useOperationStatusMutation";
import FormTextArea from "@/components/common/FormTextArea/FormTextArea";
import { StatusEnum } from "@/types/military.schema";

interface FinalizeOperationModalProps {
  isOpen: boolean;
  onClose: () => void;
  operationId: number;
}

export const OperationStatusModal = ({ isOpen, onClose, operationId }: FinalizeOperationModalProps) => {
  const { mutate, isPending } = useOperationStatusMutation();
  const [observations, setObservations] = useState<string>("");

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setObservations(e.target.value);
  }, []);

  const handleConfirm = useCallback(() => {
    mutate(
      { id: operationId, formData: { status: StatusEnum.Disabled, observations: observations.trim() || "Sin observaciones" } },
      { onSuccess: onClose }
    );
  }, [mutate, operationId, observations, onClose]);

  const buttons = useMemo(
    () => [
      {
        type: "button" as const,
        label: "Cancelar",
        onClick: onClose,
        variant: "secondary" as const,
        disabled: isPending,
      },
      {
        type: "button" as const,
        label: "Sí, estoy seguro",
        onClick: handleConfirm,
        variant: "primary" as const,
        isLoading: isPending,
        disabled: isPending,
      },
    ],
    [isPending, handleConfirm, onClose]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Finalizar Operación">
      <div className="flex flex-col items-center gap-4">
        <RiArrowUpCircleFill className="w-16 h-16 text-primary" />
        <p className="text-center">
          Parece que quieres finalizar esta operación. <br />
          ¿Estás seguro de que deseas finalizarla?
        </p>
        <div className="w-full">
          <FormTextArea
            label="Observación"
            placeholder="Añadir observaciones si es necesario"
            name="observations"
            defaultValue={observations}
            register={() => ({ onChange: handleChange })}
          />
        </div>
      </div>
      <div className="mt-4">
        <ButtonGroup buttons={buttons} />
      </div>
    </Modal>
  );
};
