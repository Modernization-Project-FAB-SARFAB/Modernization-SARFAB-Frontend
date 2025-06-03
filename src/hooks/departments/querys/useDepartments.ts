import { getDepartaments } from "@/api/DepartamentsAPI";
import { useQuery } from "@tanstack/react-query";

export const useDepartments = () => {
    return useQuery({
        queryKey: ["departments"],
        queryFn: getDepartaments,
        retry: false
    });
};