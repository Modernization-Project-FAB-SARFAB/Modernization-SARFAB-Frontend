import { Recruit, RecruitmentFormData } from "../types";

export const recruitmentColumns: Column<Recruit>[] = [
    { header: "ID", accessor: "recruitmentId" },
    { header: "Nombre", accessor: "firstName" },
    { header: "Apellido", accessor: "lastName" },
    { header: "CI", accessor: "ci" },
    { header: "Fecha de Nacimiento", accessor: "birthDate" },
    {
        header: "Opta por libreta de servicio militar",
        accessor: "wantsMilitaryService",
        render: (value: boolean) => (
            <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-semibold ${value ? "bg-success text-success" : "bg-danger text-danger"}`}>
                {value ? "Sí aplica" : "No aplica"}	
            </span>
        )
    }
];
