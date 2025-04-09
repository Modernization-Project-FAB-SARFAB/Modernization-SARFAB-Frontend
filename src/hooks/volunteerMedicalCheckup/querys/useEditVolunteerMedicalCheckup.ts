import { getMedicalCheckupById } from "@/api/VolunteerMedicalCheckupAPI";
import { useQuery } from "@tanstack/react-query";

export function useEditVolunteerMedicalCheckup(medicalCheckupId?: number | null) {
  return useQuery({
    queryKey: ['editVolunteerMedicalCheckup', medicalCheckupId],
    queryFn: () => getMedicalCheckupById(Number(medicalCheckupId)),
    retry: false,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
    staleTime: 60000,
    refetchInterval: 2000
  });
}
