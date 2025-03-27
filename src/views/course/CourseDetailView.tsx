import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useGetCourseById } from "@/hooks/courses/querys/useGetCourseById";
import { useParams } from "react-router-dom";
import CourseDetail from "@/components/course/CourseDetailComponent";

export default function CourseDetailView() {
  useBreadcrumb([
    { label: 'Cursos', path: '/courses/list' },
    { label: 'Detalle del curso' },
  ]);

  const { courseId } = useParams<{ courseId: string }>();
  const courseIdNumber = Number(courseId);

  const { data: course, isLoading: isLoadingCourse } = useGetCourseById(courseIdNumber);
  return isLoadingCourse ? (
    <p className="text-center text-gray-500">Cargando datos...</p>
  ) : (
    <div className="container mx-auto p-4">
      <CourseDetail course={course!} />
    </div>
  );
}