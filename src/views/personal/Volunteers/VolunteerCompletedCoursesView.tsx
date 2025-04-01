import VolunteerCompletedCourses from "@/components/volunteer/views/VolunteerCompletedCourses";
import { volunteerCompletedCoursesColumnsDef } from "@/constants/volunteer/VolunteerCompletedCoursesColumnDef";

export default function VolunteerCompletedCoursesView() {
    return (
        <VolunteerCompletedCourses
            breadcrumb={[{ label: "Voluntarios", path: "/volunteers/volunteer-history" }, { label: "Reporte de guardias" }]}
            columns={volunteerCompletedCoursesColumnsDef}
        />
    )
}