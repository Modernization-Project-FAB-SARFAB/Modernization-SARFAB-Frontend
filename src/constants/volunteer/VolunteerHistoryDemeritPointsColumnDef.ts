import { DemeritPointList } from "@/types/demeritPoint.schema";
import { ColumnDef } from "@tanstack/react-table";

export const VolunteerHistoryDemeritPointsColumnDef: ColumnDef<DemeritPointList>[] = [
    { header: "Razón", accessorKey: "reason" },
    { header: "Fecha", accessorKey: "date" },
    { header: "Puntos perdidos", accessorKey: "pointsLost" },
    { header: "Observación", accessorKey: "observation" },
];