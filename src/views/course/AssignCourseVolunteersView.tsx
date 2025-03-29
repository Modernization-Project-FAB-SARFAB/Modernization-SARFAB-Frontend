import AssignCourseVolunteersComponent from "@/components/course/AssignCourseVolunteersComponent";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useGetCourseById } from "@/hooks/courses/querys/useGetCourseById";
import { useParams } from "react-router-dom";

export default function AssignCourseVolunteersView() {
  useBreadcrumb([
    { label: 'Cursos', path: '/courses/list' },
    { label: 'Asignar voluntarios' },
  ]);

  const { courseId } = useParams<{ courseId: string }>();
  const courseIdNumber = Number(courseId);

  const { data: course, isLoading: isLoadingCourse, error: courseError } = useGetCourseById(courseIdNumber);
  
  if (isLoadingCourse) {
    return <p className="text-center text-gray-500">Cargando datos del curso...</p>;
  }
  
  if (courseError || !course) {
    return <p className="text-center text-red-500">Error al cargar los datos del curso</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <AssignCourseVolunteersComponent course={course} />
    </div>
  );
}