import DropdownMenu from '@/components/common/DropdownMenu/DropdownMenu';
import { InventoryItem } from '../../types/invetory.schema';
import { RiEdit2Line, RiEyeLine } from '@remixicon/react';
export const ActionsColumn = ({ row }: { row: { original: InventoryItem }; }) => {
  console.log(row);
  return (
    <>
      <DropdownMenu
        items={[
          {
            type: 'link',
            label: 'Editar elemento',
            href: ``,
            icon: <RiEdit2Line size={20} />,
          },
          {
            type: 'link',
            label: 'Ver elemento',
            href: ``,
            icon: <RiEyeLine size={20} />,
          },
          {
            type: 'link',
            label: 'Registrar extracción',
            href: ``,
          },
          {
            type: 'link',
            label: 'Registrar devolución',
            href: ``,
          },
        ]}
      />

      
    </>
  );
}