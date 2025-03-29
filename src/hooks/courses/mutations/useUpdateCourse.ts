import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourse } from "@/api/CoursesAPI";
import { UpdateCourseForm } from "@/types/courses.schema";

interface UpdateCourseParams {
  id: number;
  formData: UpdateCourseForm;
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: UpdateCourseParams) => 
      updateCourse(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}
