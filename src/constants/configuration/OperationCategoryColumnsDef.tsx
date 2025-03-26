import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { RiEdit2Line } from "@remixicon/react";

export const CategoryActionsColumn = ({ row, openEditModal }: { row: any; openEditModal: (categoryId: number) => void }) => {
  return (
    <DropdownMenu
      items={[
        {
          type: "button", 
          label: "Editar categoría",
          onClick: () => openEditModal(row.original.categoryId),
          icon: <RiEdit2Line size={20} />
        }
      ]}
    />
  );
};

export const OperationTypeActionsColumn = ({ row }: { row: any }) => {
  return (
    <DropdownMenu
      items={[
        {
          type: "link", 
          label: "Editar tipo",
          href: `/configuration/operation-type/${row.original.operationTypeId}/edit`,
          icon: <RiEdit2Line size={20} />
        }
      ]}
    />
  );
};
