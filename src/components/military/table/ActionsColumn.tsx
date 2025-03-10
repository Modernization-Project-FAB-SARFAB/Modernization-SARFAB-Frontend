import { useState } from 'react';
import DropdownMenu from '@/components/common/DropdownMenu/DropdownMenu';
import {
  RiEdit2Line,
  RiArrowUpCircleLine,
  RiUserUnfollowLine,
} from '@remixicon/react';
import { Military } from '@/types/index';
import { MilitaryFormModal } from '@/components/military';

export const ActionsColumn = ({ row }: { row: { original: Military } }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEditClick = () => {
    if (!row.original.id) return;
    setIsModalOpen(true);
  };
  const menuItems = [
    {
      type: 'button' as const,
      label: 'Editar personal militar',
      onClick: handleEditClick,
      icon: <RiEdit2Line size={20} />,
    },
    {
      type: 'button' as const,
      label: 'Desactivar personal',
      onClick: () => console.log(`Desactivar ID: ${row.original.id}`),
      icon: <RiUserUnfollowLine size={20} />,
    },
    {
      type: 'button' as const,
      label: 'Ascender',
      onClick: () => console.log(`Ascender ID: ${row.original.id}`),
      icon: <RiArrowUpCircleLine size={20} />,
    },
  ];

  return (
    <>
      <DropdownMenu items={menuItems} />
      {isModalOpen && row.original.id && (
        <MilitaryFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          militaryId={row.original.id}
        />
      )}
    </>
  );
};
