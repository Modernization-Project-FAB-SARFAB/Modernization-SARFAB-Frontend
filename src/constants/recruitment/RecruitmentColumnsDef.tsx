import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { baseColumns } from "./baseColumns";
import { RiEdit2Line, RiEyeFill, RiUserFollowLine } from "@remixicon/react";
import { ColumnDef } from "@tanstack/react-table";
import { Recruit } from "@/types/index";
import { useNavigate } from "react-router-dom";

const ActionsColumn = ({ row }: { row: any }) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu
      items={[
        {
          type: "link", label: "Afiliar recluta",
          onClick: () => navigate(`/volunteers/create?recruitId=${row.original.recruitmentId}`),
          icon: <RiUserFollowLine size={20} />, ref: "text-success "
        },
        {
          type: "link", label: "Editar recluta",
          href: `/recruitment/${row.original.recruitmentId}/edit`, 
          icon: <RiEdit2Line size={20} />
        },
        { type: "link", label: "Ver recluta", 
          onClick: () => navigate(`?viewRecruit=true&recruitId=${row.original.recruitmentId}`),
          icon: <RiEyeFill size={20} /> }
      ]}
    />
  );
};

export const recruitmentColumnsDef:  ColumnDef<Recruit>[] = [
  ...baseColumns,
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <ActionsColumn row={row} />,
    enableSorting: false,
  }
];