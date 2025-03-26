import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { RiEdit2Line } from "@remixicon/react";

// Componente para las acciones de categoría
export const CategoryActionsColumn = ({ row }: { row: any }) => {
  return (
    <DropdownMenu
      items={[
        {
          type: "link", 
          label: "Editar categoría",
          href: `/configuration/operation-category/${row.original.categoryId}/edit`,
          icon: <RiEdit2Line size={20} />
        }
      ]}
    />
  );
};

// Componente para las acciones de tipo de operación
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
