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

export const OperationTypeActionsColumn = ({ row, openEditModal }: { row: any; openEditModal: (typeId: number, categoryId: number) => void }) => {
  return (
    <DropdownMenu
      items={[
        {
          type: "button", 
          label: "Editar tipo",
          onClick: () => openEditModal(row.original.operationTypeId, row.original.operationCategoryId),
          icon: <RiEdit2Line size={20} />
        }
      ]}
    />
  );
};
