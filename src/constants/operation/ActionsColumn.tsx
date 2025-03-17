import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { ActiveOperation } from "@/types/operation.schema";
import { RiEdit2Line, RiEyeLine, RiListCheck3 } from "@remixicon/react";

export const ActionsColumn = ({ row }: { row: { original: ActiveOperation } }) => {
  return (
    <DropdownMenu
      items={[
        { type: "link", label: "Editar operación", href: `/operation/${row.original.operationId}/edit`, icon: <RiEdit2Line size={20} /> },
        { type: "link", label: "Ver operación", href: ``, icon: <RiEyeLine size={20} /> },
        { type: "link", label: "Marcar asistencia", href: ``, icon: <RiListCheck3 size={20} /> }
      ]}
    />
  );
};
