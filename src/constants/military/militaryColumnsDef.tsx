import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { baseColumns } from "./baseColumns";
import { RiEdit2Line, RiEyeFill } from "@remixicon/react";
import { ColumnDef } from "@tanstack/react-table";
import { Military } from "@/types/index";
import { useNavigate } from "react-router-dom";

const ActionsColumn = ({ row }: { row: any }) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu
      items={[
        {
          type: "link",
          label: "Editar militar",
          href: `/military/${row.original.id}/edit`,
          icon: <RiEdit2Line size={20} />
        },
        {
          type: "link",
          label: "Ver detalles",
          onClick: () => navigate(`?viewMilitary=true&militaryId=${row.original.id}`),
          icon: <RiEyeFill size={20} />
        }
      ]}
    />
  );
};

export const militaryColumnsDef: ColumnDef<Military>[] = [
  ...baseColumns,
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <ActionsColumn row={row} />
      </div>
    ),
    enableSorting: false,
  }
];
