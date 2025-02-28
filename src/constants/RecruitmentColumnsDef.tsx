import { ColumnDef } from "@tanstack/react-table";
import { Recruit } from "../types";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { RiCheckboxCircleFill, RiCloseCircleFill, RiEdit2Line } from "@remixicon/react";

export const recruitmentColumnsDef: ColumnDef<Recruit>[] = [
    { header: "ID", accessorKey: "recruitmentId", enableHiding: true },
    { header: "Nombre", accessorKey: "firstName" },
    { header: "Apellido", accessorKey: "lastName" },
    { header: "CI", accessorKey: "ci" },
    { header: "Fecha de Nacimiento", accessorKey: "birthDate" },
    {
        header: "Opta por libreta de servicio militar",
        accessorKey: "wantsMilitaryService",
        cell: ({ getValue }) => {
            const value = getValue<boolean>();
            return (
                <span
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-semibold ${value ? 'bg-success text-success' : 'bg-danger text-danger'
                        }`}
                >
                    {value ? 'Sí aplica' : 'No aplica'}
                </span>
            );
        },
    },
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
