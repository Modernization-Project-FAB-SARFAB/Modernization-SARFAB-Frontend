import VolunteerGuardsReport from "@/components/volunteer/views/VolunteerGuardsReport";
import { volunteerGuardsReportColumnsDef } from "@/constants/volunteer/VolunteerGuardsReportColumnDef";

export default function VolunteerGuardsReportView() {
    return (
        <VolunteerGuardsReport
            breadcrumb={[{ label: "Voluntarios", path: "/volunteers/volunteer-history" }, { label: "Reporte de guardias" }]}
            columns={volunteerGuardsReportColumnsDef}
        />
    )
}