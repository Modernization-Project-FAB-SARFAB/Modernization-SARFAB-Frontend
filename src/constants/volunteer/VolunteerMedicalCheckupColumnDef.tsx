import { ColumnDef } from "@tanstack/react-table";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { useNavigate } from "react-router-dom";
import { RiEdit2Line } from "@remixicon/react";
import { MedicalCheckup } from "@/types/volunteerMedicalCheckup";
import ExpandableText from "@/components/common/ShowMoreText/ShowMoreText";

const ActionsColumn = ({ row, table }: { row: any; table: any }) => {
    const navigate = useNavigate();
    const { id } = row.original;
    const totalRows = table.getRowModel().rows.length;
    const isFirstRow = row.index === 0;

    if (!isFirstRow) return <></>;

    const items: DropdownItem[] = [
        {
            type: "link",
            label: "Editar chequeo",
            onClick: () => navigate(`?edit-medical-checkup=true&medicalCheckupId=${row.original.checkupId}`),
            icon: <RiEdit2Line size={20} />,
        }
    ];

    return <DropdownMenu items={items} />;
};

export const volunteerMedicalCheckupColumnsDef: ColumnDef<MedicalCheckup>[] = [
    { header: "Fecha de chequeo", accessorKey: "checkupDate" },
    {
        header: "Fecha de expiración", accessorKey: "expirationDate",
        cell: ({ row }) => {
            const expiration = new Date(row.original.expirationDate);
            const today = new Date();
            const diffInDays = (expiration.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
            const isExpiringSoon = diffInDays <= 3 && diffInDays >= 0;

            return (
                <div className="flex flex-col items-center gap-2">
                    <span className={isExpiringSoon ? "text-danger font-bold" : ""}>
                        {row.original.expirationDate}
                    </span>
                    {isExpiringSoon && <span className="text-sm text-danger font-bold bg-danger bg-opacity-25 p-2 rounded-t-md">¡Alerta! Este chequeo expira pronto.</span>}
                </div>
            );
        }
    },
    { header: "Observaciones", accessorKey: "observations",  cell: ({ getValue }) => <ExpandableText text={getValue<string>() ?? "Sin observaciones"} />
        
     },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row, table }) => <ActionsColumn row={row} table={table} />,
        enableSorting: false,
    }
];

export const volunteerHistoricalMedicalCheckupColumnsDef: ColumnDef<MedicalCheckup>[] = [
    { header: "Fecha de chequeo", accessorKey: "checkupDate" },
    { header: "Fecha de expiración", accessorKey: "expirationDate" },
    { header: "Observaciones", accessorKey: "observations" },
];
