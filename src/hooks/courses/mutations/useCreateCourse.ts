import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse } from "@/api/CoursesAPI";
import { CreateCourseForm } from "@/types/courses.schema";

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCourseForm) => createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}
