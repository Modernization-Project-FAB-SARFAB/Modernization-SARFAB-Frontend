import DropdownMenu from '@/components/common/DropdownMenu/DropdownMenu';
import { InventoryItem } from '../../types/invetory.schema';
import { RiEdit2Line, RiEyeLine, RiInboxUnarchiveLine, RiInboxArchiveLine } from '@remixicon/react';
export const ActionsColumn = ({ row }: { row: { original: InventoryItem }; }) => {
  return (
    <>
      <DropdownMenu
        items={[
          {
            type: 'link',
            label: 'Editar elemento',
            href: `/inventory/list?openItemModal=true&itemId=${row.original.itemId}`,
            icon: <RiEdit2Line size={20} />,
          },
          {
            type: 'link',
            label: 'Ver elemento',
            href: `/inventory/${row.original.itemId}`,
            icon: <RiEyeLine size={20} />,
          },
          {
            type: 'link',
            label: 'Registrar extracción',
            href: `?openItemMovementModal=true&itemId=${row.original.itemId}`,
            icon: <RiInboxUnarchiveLine size={20} />,
          },
          {
            type: 'link',
            label: 'Registrar devolución',
            href: `?openItemMovementModal=true&itemId=${row.original.itemId}&isReturn=true`,
            icon: <RiInboxArchiveLine size={20} />,
          },
        ]}
      />
    </>
  );
}