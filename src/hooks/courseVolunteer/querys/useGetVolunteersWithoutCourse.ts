import { useQuery } from "@tanstack/react-query";
import { getVolunteersWithoutCourse } from "@/api/OperationContextAPI";
import { VolunteerWithRankList } from "@/types/operationContext.schema";

export function useGetVolunteersWithoutCourse(courseId: number | undefined) {
  return useQuery<VolunteerWithRankList>({
    queryKey: ["volunteersWithoutCourse", courseId],
    queryFn: () => {
      if (courseId === undefined) {
        return [];
      }
      return getVolunteersWithoutCourse(courseId);
    },
    enabled: courseId !== undefined,
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
