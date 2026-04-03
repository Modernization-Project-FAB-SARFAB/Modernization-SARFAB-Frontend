import { ColumnDef } from "@tanstack/react-table";
import { VolunteerGuard } from "@/types/volunteer.schema";
import { convertToLocalDate } from "@/utils/common/formatDate";

export const volunteerGuardsReportColumnsDef: ColumnDef<VolunteerGuard>[] = [
    {
        header: "Fecha de la guardia",
        accessorKey: "guardDate",
        cell: ({ getValue }) => convertToLocalDate(getValue<string>()),
    },
    {
        header: "Turno",
        accessorKey: "shiftName",
        cell: ({ getValue }) => {
            const shift = getValue<string>();

            const shiftStyles: Record<string, string> = {
                "Mañana": "bg-primary text-blue-800",
                "Tarde": "bg-secondary text-yellow-800",
                "Noche": "bg-gray text-gray-800",
            };

            return (
                <span
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-semibold 
                        ${shiftStyles[shift] || "bg-gray-100 text-gray-800"}`}
                >
                    {shift}
                </span>
            );
        }
    },
    { header: "Responsable", accessorKey: "responsibleFullname" },
    { header: "Ubicación", accessorKey: "location" },
    { header: "Observaciones", accessorKey: "observation" },
    {
        header: "Estado",
        accessorKey: "status",
        cell: ({ getValue }) => {
            const status = getValue<number>();
            return (
                <span
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-semibold 
                        ${status === 1 ? 'bg-success text-success' : status === 2 ? 'bg-danger text-danger' : 'bg-warning text-warning'}`}
                >
                    {status === 1 ? "Asistió" : status === 2 ? "No asistió" : 'Pendiente'}
                </span>
            );
        }
    },
];