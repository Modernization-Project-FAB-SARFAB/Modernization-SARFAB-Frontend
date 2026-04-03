import { ColumnDef } from "@tanstack/react-table";
import { VolunteerCompletedCourse } from "@/types/courseVolunteer.schema";
import { convertToLocalDate } from "@/utils/common/formatDate";

export const volunteerCompletedCoursesColumnsDef: ColumnDef<VolunteerCompletedCourse>[] = [
    { header: "Curso", accessorKey: "courseName" },
    {
        header: "Fecha de finalización",
        accessorKey: "completionDate",
        cell: ({ getValue }) => convertToLocalDate(getValue<string>()),
    },
    { header: "Descripción", accessorKey: "description" }
];