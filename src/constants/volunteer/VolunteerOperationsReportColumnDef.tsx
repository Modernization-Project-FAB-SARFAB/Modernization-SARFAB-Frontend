import { ColumnDef } from "@tanstack/react-table";
import { VolunteerOperation } from "@/types/volunteer.schema";

export const volunteerOperationsReportColumnsDef: ColumnDef<VolunteerOperation>[] = [
    {
        header: "Fecha del operativo", accessorKey: "operationDate",
        cell: ({ row }) => {
            const date = new Date(row.original.operationDate);
            const formatted = date.toISOString().split("T")[0];
            return formatted;
        }
    },
    { header: "Actividad", accessorKey: "activity" },
    { header: "Ubicación", accessorKey: "location" },
    { header: "Dirección", accessorKey: "address" },
    { header: "Responsable", accessorKey: "responsible" },
    { header: "Observaciones", accessorKey: "observations" },
];