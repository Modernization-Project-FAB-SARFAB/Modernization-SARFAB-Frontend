import { ColumnDef } from "@tanstack/react-table";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { useNavigate } from "react-router-dom";
import { RiEdit2Line } from "@remixicon/react";
import { MedicalCheckup } from "@/types/volunteerMedicalCheckup";

const ActionsColumn = ({ row }: { row: any }) => {
    const navigate = useNavigate();
    const { id } = row.original;

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