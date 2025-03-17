import { getShift } from "@/api/GuardAPI";
import { useQuery } from "@tanstack/react-query";


export function useShift() {
    const { data, isLoading } = useQuery({
        queryKey: ['guard'],
        queryFn: () => getShift(),
        retry: false,
    })

    return {
        shiftData: data,
        shiftDataisLoading: isLoading
    };
}