import { ColumnDef } from "@tanstack/react-table";
import { VolunteerOperation } from "@/types/volunteer.schema";

export const volunteerOperationsReportColumnsDef: ColumnDef<VolunteerOperation>[] = [
    { header: "Fecha de la operación", accessorKey: "operationDate" },
    { header: "Actividad", accessorKey: "activity" },
    { header: "Ubicación", accessorKey: "location" },
    { header: "Dirección", accessorKey: "address" },
    { header: "Responsable", accessorKey: "responsible" },
    { header: "Observaciones", accessorKey: "observations" },
];