import { Course } from "@/types/courses.schema";
import { RiEyeLine, RiEdit2Line, RiUserAddLine } from "@remixicon/react";
import { ColumnDef } from "@tanstack/react-table";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { useNavigate } from "react-router-dom";

// Componente para la columna de acciones
const ActionsColumn = ({ row }: { row: any }) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu
      items={[
        {
          type: "link", 
          label: "Asignar personas",
          onClick: () => navigate(`/courses/${row.original.id}/assign`),
          icon: <RiUserAddLine size={20} />
        },
        {
          type: "link", 
          label: "Editar curso", 
          href: `/courses/${row.original.id}/edit`,
          icon: <RiEdit2Line size={20} />
        },
        { 
          type: "link", 
          label: "Ver curso", 
          onClick: () => navigate(`/courses/${row.original.id}/details`),
          icon: <RiEyeLine size={20} /> 
        }
      ]}
    />
  );
};

// Definición final de columnas con la columna de acciones
export const courseColumnsDef: ColumnDef<Course>[] = [
  {
    accessorKey: "id",
    header: "ID",
    maxSize: 60
  },
  {
    accessorKey: "name",
    header: "Nombre del Curso",
    maxSize: 250,
    cell: info => {
      const value = info.getValue() as string;
      return (
        <div 
          className="text-center whitespace-normal break-words" 
          title={value}
          style={{ minHeight: '2.5rem' }}
        >
          {value}
        </div>
      );
    }
  },
  {
    accessorKey: "description",
    header: () => <div className="text-left">Descripción</div>,
    maxSize: 300,
    cell: info => {
      const value = info.getValue() as string;
      return (
        <div 
          className="text-left whitespace-normal break-words line-clamp-3" 
          title={value}
          style={{ minHeight: '2.5rem' }}
        >
          {value}
        </div>
      );
    }
  },
  {
    id: "actions",
    header: "Acciones",
    maxSize: 100,
    cell: ({ row }) => <ActionsColumn row={row} />,
    enableSorting: false,
  }
];
