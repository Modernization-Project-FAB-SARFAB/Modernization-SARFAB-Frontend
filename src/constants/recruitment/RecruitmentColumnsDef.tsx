import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { baseColumns } from "./baseColumns";
import { RiEdit2Line, RiEyeFill, RiUserFollowLine } from "@remixicon/react";
import { ColumnDef } from "@tanstack/react-table";
import { Recruit } from "@/types/index";

export const recruitmentColumnsDef: ColumnDef<Recruit>[] = [
  ...baseColumns,
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <DropdownMenu
        items={[
          { type: "link", label: "Afiliar recluta", href: `/recruitment/${row.original.recruitmentId}/edit`, icon: <RiUserFollowLine size={20} />, ref: "text-success " },
          { type: "link", label: "Editar recluta", href: ``, icon: <RiEdit2Line size={20} /> },
          { type: "link", label: "Ver recluta", href: ``, icon: <RiEyeFill size={20} /> }
        ]}
      />
    ),
    enableSorting: false,
  }
];