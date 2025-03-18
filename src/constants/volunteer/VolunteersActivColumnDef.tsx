import { Volunteer } from "@/types/volunteer.schema";
import { ColumnDef } from "@tanstack/react-table";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { useNavigate } from "react-router-dom";
import { RiArrowUpCircleLine, RiEdit2Line, RiEyeFill, RiFileUserFill, RiFileUserLine, RiGraduationCapLine, RiShakeHandsFill } from "@remixicon/react";

const ActionsColumn = ({ row }: { row: any }) => {
    const navigate = useNavigate();

    return (
        <DropdownMenu
            items={[
                {
                    type: "link", label: "Editar voluntario",
                    href: `/volunteer/${row.original.volunteerId}/edit`,
                    icon: <RiEdit2Line size={20} />
                },
                {
                    type: "link", label: "Ver voluntario",
                    href: `/volunteer/${row.original.volunteerId}/view`,
                    icon: <RiEyeFill size={20} />
                },
                {
                    type: "link", label: "Reporte de guardias",
                    href: `/volunteer/${row.original.volunteerId}/guard_report`,
                    icon: <RiFileUserFill size={20} />
                },
                {
                    type: "link", label: "Rep. de operaciones",
                    href: `/volunteer/${row.original.volunteerId}/operations_report`,
                    icon: <RiShakeHandsFill size={20} />
                },
                {
                    type: "link", label: "Promover de grado",
                    onClick: () => navigate(`?promote=true&volunteerId=${row.original.recruitmentId}`),
                    icon: <RiArrowUpCircleLine size={20} 
                    />,
                    ref: "text-success" 
                },
                {
                    type: "link", label: "Agregar curso",
                    onClick: () => navigate(`?addCourse=true&volunteerId=${row.original.recruitmentId}`),
                    icon: <RiGraduationCapLine size={20} />,
                    ref: "text-primary" 
                }
            ]}
        />
    );
};

export const volunteerColumnsDef: ColumnDef<Volunteer>[] = [
    { header: "Apellidos", accessorKey: "lastName"},
    { header: "Nombres", accessorKey: "name" },
    { header: "CI", accessorKey: "ci" },
    { header: "Número de celular", accessorKey: "mobilePhone" },
    { header: "Correo elétronico", accessorKey: "email" },
    { header: "Grado", accessorKey: "gradeName" },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => <ActionsColumn row={row} />,
        enableSorting: false,
    }
];