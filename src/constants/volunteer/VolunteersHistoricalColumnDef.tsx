import { Volunteer } from "@/types/volunteer.schema";
import { ColumnDef } from "@tanstack/react-table";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { RiEyeFill, RiFileUserFill, RiShakeHandsFill } from "@remixicon/react";
import ExpandableText from "@/components/common/ShowMoreText/ShowMoreText";

const ActionsColumn = ({ row }: { row: any }) => {
    return (
        <DropdownMenu
            items={[
                {
                    type: "link", label: "Ver voluntario",
                    href: `/volunteers/${row.original.volunteerId}/view?historicalData=true`,
                    icon: <RiEyeFill size={20} />
                },
                {
                    type: "link", label: "Reporte de guardias",
                    href: `/volunteers/${row.original.volunteerId}/report-guards`,
                    icon: <RiFileUserFill size={20} />
                },
                {
                    type: "link", label: "Rep. de operaciones",
                    href: `/volunteers/${row.original.volunteerId}/report-operations`,
                    icon: <RiShakeHandsFill size={20} />
                },
            ]}
        />
    );
};

export const volunteerColumnsDef: ColumnDef<Volunteer>[] = [
    { header: "Apellidos", accessorKey: "lastName" },
    { header: "Nombres", accessorKey: "name" },
    { header: "Grado", accessorKey: "gradeName" },
    { header: "Fecha de salida", accessorKey: "dapartureDate", },
    {
        header: "Observación de salida", accessorKey: "reason",
        cell: ({ getValue }) => {
            const value = getValue<string>();

            return (
                <ExpandableText text={value ?? "Sin observaciones"} />
            );
        }
    },
    {
        header: "Estado", accessorKey: "volunteerStatus",
        cell: ({ getValue }) => {
            const value = getValue<string>();

            const statusConfig: Record<string, { text: string; className: string }> = {
                "0": { text: "BAJA", className: "bg-danger text-danger" },
                "2": { text: "CUMPLIÓ", className: "bg-success text-success" }
            };

            const { text, className } = statusConfig[value] || {
                text: "Desconocido",
                className: "bg-gray-400 text-gray-600"
            };

            return (
                <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-semibold ${className}`}>
                    {text}
                </span>
            );
        }
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => <ActionsColumn row={row} />,
        enableSorting: false,
    }
];