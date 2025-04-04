import { ColumnDef } from "@tanstack/react-table";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { useNavigate } from "react-router-dom";
import { RiEdit2Line } from "@remixicon/react";
import { MedicalCheckup } from "@/types/volunteerMedicalCheckup";

const ActionsColumn = ({ row, table }: { row: any; table: any }) => {
    const navigate = useNavigate();
    const { id } = row.original;
    const totalRows = table.getRowModel().rows.length;
    const isFirstRow = row.index === 0; // Verifica si es la primera fila
    
    if (!isFirstRow) return <></>; // Si no es la primera fila, no muestra las acciones
    
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
    { header: "Fecha de expiración", accessorKey: "expirationDate" },
    { header: "Observaciones", accessorKey: "observations" },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row, table }) => <ActionsColumn row={row} table={table} />,
        enableSorting: false,
    }
];
