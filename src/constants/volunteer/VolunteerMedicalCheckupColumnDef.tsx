import { ColumnDef } from "@tanstack/react-table";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { useNavigate } from "react-router-dom";
import { RiEdit2Line } from "@remixicon/react";
import { MedicalCheckup } from "@/types/volunteerMedicalCheckup";

const ActionsColumn = ({ row, table }: { row: any; table:any }) => {
    const navigate = useNavigate();
    const { id } = row.original;
    const totalRows = table.getRowModel().rows.length;
    const isLastRow = row.index === totalRows - 1;

    if (!isLastRow) return <></>;
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
        cell: ({ row, table }) => <ActionsColumn row={row} table={table}/>,
        enableSorting: false,
    }
];