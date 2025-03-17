import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { RiCheckLine, RiEdit2Line, RiEyeFill, RiListCheck3 } from "@remixicon/react";
import { ColumnDef } from "@tanstack/react-table";
import { Guard } from "@/types/guard.schema";
import { format, parseISO } from "date-fns";

const statusConfig: Record<number, { text: string; className: string }> = {
    1: { text: "Programado", className: "bg-warning text-warning" },
    0: { text: "Finalizado", className: "bg-success text-success" },
};

export const guardColumnDef: ColumnDef<Guard>[] = [
    {
        header: "Fecha de guardia",
        accessorKey: "guardDate",
        cell: ({ getValue }) => {
            const date = getValue<string>();
            const parsedDate = parseISO(date);

            return parsedDate ? format(parsedDate, "dd/MM/yyyy") : "-";
        }
    },
    { header: "Turno", accessorKey: "shiftName" },
    { header: "Responsable", accessorKey: "responsibleFullname" },
    { header: "Lugar de la guardia", accessorKey: "location" },
    { header: "Cant. voluntarios", accessorKey: "volunteerQuantity" },
    {
        header: "Observaciones",
        accessorKey: "observation",
        cell: ({ getValue }) => {
            const value = getValue<string>();
            const truncatedValue = value.length > 50 ? `${value.slice(0, 50)}...` : value;

            return (
                <span className="text-left">
                    {truncatedValue}
                </span>
            );
        }
    },
    {
        header: "Estado",
        accessorKey: "status",
        cell: ({ getValue }) => {
            const value = getValue<number>();
            const { text, className } = statusConfig[value] || {
                text: "Desconocido",
                className: "bg-gray-400 text-gray-600",
            };
            return (
                <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-semibold ${className}`}>
                    {text}
                </span>
            );
        },
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => <ActionsColumn row={row} />,
        enableSorting: false,
    }
];

const ActionsColumn = ({ row }: { row: any }) => {
    return (
        <DropdownMenu
            items={[
                {
                    type: "link", label: "Editar guardia",
                    href: `/guards/${row.original.guardId}/edit`,
                    icon: <RiEdit2Line size={20} />
                },
                {
                    type: "link", label: "Ver tratamiento",
                    href: `/guards/${row.original.guardId}`,
                    icon: <RiEyeFill size={20} />
                },
                {
                    type: "link", label: "Marcar inasistencia",
                    href: `/guards/${row.original.guardId}`,
                    icon: <RiListCheck3 size={20} />
                },
                {
                    type: "link", label: "Finalizar",
                    href: `/guards/${row.original.guardId}`,
                    icon: <RiCheckLine size={20} />
                }
            ]}
        />
    );
};