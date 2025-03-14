import { getGrades } from "@/api/GradesAPI";
import { useQuery } from "@tanstack/react-query";

export const useGrades = () => {
    return useQuery({
        queryKey: ["grades"],
        queryFn: getGrades,
        staleTime: 1000 * 60 * 5,
    });
};