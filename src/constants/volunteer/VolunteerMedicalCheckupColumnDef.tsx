import { Volunteer } from "@/types/volunteer.schema";
import { ColumnDef } from "@tanstack/react-table";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { useNavigate } from "react-router-dom";
import { RiArrowUpCircleLine, RiEdit2Line, RiEyeFill, RiFileUserFill, RiGraduationCapLine, RiShakeHandsFill } from "@remixicon/react";
import { MedicalCheckup } from "@/types/volunteerMedicalCheckup";

const ActionsColumn = ({ row }: { row: any }) => {
    const navigate = useNavigate();
    const { gradeName, id} = row.original;

    const items: DropdownItem[] = [
        {
            type: "link",
            label: "Editar chequeo",
            href: `/volunteers/${id}/edit`,
            icon: <RiEdit2Line size={20} />,
        }
    ];

    return <DropdownMenu items={items} />;
};

export const volunteerMedicalCheckupColumnsDef: ColumnDef<MedicalCheckup>[] = [
    { header: "Fecha de chequeo", accessorKey: "checkupDate" },
    { header: "Fecha de expiración", accessorKey: "expirationDate" },
    { header: "Observaciones", accessorKey: "observations" },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => <ActionsColumn row={row} />,
        enableSorting: false,
    }
];