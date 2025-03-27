import { CourseListViewComponent } from "@/components/course/CourseListViewComponent";
import { courseColumnsDef } from "@/constants/courses/CourseColumnsDef";
// import { DetailsCourseModal } from "@/components/course/DetailsCourseModal";

export default function CourseListView() {
    return (
        <CourseListViewComponent
            breadcrumb={[{ label: "Cursos", path: "/courses/list" }, { label: "Listado de cursos" }]}
            columns={courseColumnsDef}
            modalComponent={''}
        />
    );
}