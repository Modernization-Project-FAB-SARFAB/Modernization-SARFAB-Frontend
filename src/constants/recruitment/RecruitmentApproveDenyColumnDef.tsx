import { ColumnDef } from "@tanstack/react-table";
import { Recruit } from "@/types/index";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { RiCheckboxCircleFill, RiCloseCircleFill, RiEdit2Line } from "@remixicon/react";
import { baseColumns } from "./baseColumns";

export const RecruitmentApproveDenyColumnDef: ColumnDef<Recruit>[] = [
  ...baseColumns,
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <DropdownMenu
        items={[
          { type: "link", label: "Editar recluta", href: `/recruitment/${row.original.recruitmentId}/edit`, icon: <RiEdit2Line size={20} /> },
          { type: "link", label: "Rechazar recluta", href: ``, icon: <RiCloseCircleFill size={20} />, ref: "text-danger" },
          { type: "link", label: "Aprobar recluta", href: ``, icon: <RiCheckboxCircleFill size={20} />, ref: "text-success" }
        ]}
      />
    ),
    enableSorting: false,
  }
];