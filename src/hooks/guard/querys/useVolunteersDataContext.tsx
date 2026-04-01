import { getVolunteersWithActiveMedicalCheckup } from "@/api/OperationContextAPI";
import { useQuery } from "@tanstack/react-query";

export function useVolunteerDataContext() {
    const { data, isLoading } = useQuery({
        queryKey: ['GuardContextData'],
        queryFn: () => getVolunteersWithActiveMedicalCheckup(),
        retry: false,
    })

    return {
        volunteersData: data,
        volunteersDataIsLoading: isLoading
    };
}