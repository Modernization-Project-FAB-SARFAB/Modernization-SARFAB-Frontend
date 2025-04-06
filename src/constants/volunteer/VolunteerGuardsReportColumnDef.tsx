import { ColumnDef } from "@tanstack/react-table";
import { VolunteerGuard } from "@/types/volunteer.schema";

export const volunteerGuardsReportColumnsDef: ColumnDef<VolunteerGuard>[] = [
    { header: "Fecha de la guardia", accessorKey: "guardDate" },
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
            const isCompleted = status === 0;
            return (
                <span
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-semibold 
                        ${isCompleted ? 'bg-success text-success' : 'bg-danger text-danger'}`}
                >
                    {isCompleted ? "Asistió" : "No asistió"}
                </span>
            );
        }
    },
];