import { useState } from 'react';
import DropdownMenu from '@/components/common/DropdownMenu/DropdownMenu';
import { ActiveOperation, StatusEnum } from '@/types/operation.schema';
import {
  RiEdit2Line,
  RiEyeLine,
  RiListCheck3,
  RiCloseCircleLine,
} from '@remixicon/react';
import { OperationStatusModal } from '@/components/operation/OperationStatusModal';

export const ActionsColumn = ({
  row,
}: {
  row: { original: ActiveOperation };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOperationId, setSelectedOperationId] = useState<number | null>(
    null,
  );

  const openModal = (operationId: number) => {
    setSelectedOperationId(operationId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOperationId(null);
  };

  return (
    <>
      <DropdownMenu
        items={[
          {
            type: 'link',
            label: 'Editar operación',
            href: `/operation/${row.original.operationId}/edit`,
            icon: <RiEdit2Line size={20} />,
          },
          {
            type: 'link',
            label: 'Ver operación',
            href: `/operation/${row.original.operationId}`,
            icon: <RiEyeLine size={20} />,
          },
          {
            type: 'link',
            label: 'Marcar asistencia',
            href: `/operation/${row.original.operationId}/absence`,
            icon: <RiListCheck3 size={20} />,
          },
          ...(row.original.status !== StatusEnum.Disabled
            ? ([
                {
                  type: 'button' as const,
                  label: 'Finalizar operación',
                  onClick: () => openModal(row.original.operationId),
                  icon: <RiCloseCircleLine size={20} />,
                },
              ] as const)
            : []),
        ]}
      />

      {selectedOperationId !== null && (
        <OperationStatusModal
          isOpen={isModalOpen}
          onClose={closeModal}
          operationId={selectedOperationId}
        />
      )}
    </>
  );
};
