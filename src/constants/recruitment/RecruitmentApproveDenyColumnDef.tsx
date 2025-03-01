import { ColumnDef } from "@tanstack/react-table";
import { Recruit } from "@/types/index";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { RiCheckboxCircleFill, RiCloseCircleFill, RiEdit2Line } from "@remixicon/react";
import { baseColumns } from "./baseColumns";
import { useNavigate } from "react-router-dom";

// Crea un componente funcional para manejar la navegación
const ActionsColumn = ({ row }: { row: any }) => {
  const navigate = useNavigate();  // Ahora `useNavigate` se usa correctamente dentro de un componente funcional

  return (
    <DropdownMenu
      items={[
        { 
          type: "link", 
          label: "Editar recluta", 
          href: `/recruitment/${row.original.recruitmentId}/edit`, 
          icon: <RiEdit2Line size={20} /> 
        },
        { 
          type: "link", 
          label: "Rechazar recluta", 
          onClick: () => navigate('?denyRecruit=true'), 
          icon: <RiCloseCircleFill size={20} />, 
          ref: "text-danger" 
        },
        { 
          type: "link", 
          label: "Aprobar recluta", 
          onClick: () => navigate('?approveRecruit=true'), 
          icon: <RiCheckboxCircleFill size={20} />, 
          ref: "text-success" 
        }
      ]}
    />
  );
};

export const RecruitmentApproveDenyColumnDef: ColumnDef<Recruit>[] = [
  ...baseColumns,
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <ActionsColumn row={row} />,  // Usamos el componente aquí
    enableSorting: false,
  }
];
