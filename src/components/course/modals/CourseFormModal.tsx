import { useCourseFormLogic } from "@/hooks/courses/useCourseFormLogic";
import Modal from "@/components/common/Modal/Modal";
import { CourseForm } from "../forms/CourseForm";

interface CourseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId?: number;
  courseData?: { name: string; description: string };
}

export function CourseFormModal({
  isOpen,
  onClose,
  courseId,
  courseData,
}: CourseFormModalProps) {
  const { 
    isLoading, 
    handleFormSubmit, 
    formProps
  } = useCourseFormLogic({
    isOpen,
    courseId,
    courseData,
    onClose,
  });

  return (
    <Modal
      key={courseId}
      title={
        courseId
          ? "Editar curso"
          : "Registrar curso"
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      {isLoading && !formProps.form ? (
        <div className="p-8 text-center text-gray-500">Cargando datos...</div>
      ) : (
        <CourseForm
          {...formProps}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          onClose={onClose}
          courseId={courseId}
        />
      )}
    </Modal>
  );
}
