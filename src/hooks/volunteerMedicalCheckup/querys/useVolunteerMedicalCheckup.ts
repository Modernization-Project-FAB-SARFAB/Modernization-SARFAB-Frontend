import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { getVolunteerMedicalCheckup } from "@/api/VolunteerMedicalCheckupAPI";

interface UseVolunteerMedicalCheckupOptions {
  initialVolunteerId?: string;
}

export function useVolunteerMedicalCheckup({ initialVolunteerId}: UseVolunteerMedicalCheckupOptions = {}) {
  
  const [volunteerId, setVolunteerId] = useState(initialVolunteerId);
  const [debouncedVolunteerId] = useDebounce(volunteerId, 500);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["volunteerMedicalCheckup", debouncedVolunteerId],
    queryFn: () => (debouncedVolunteerId ? getVolunteerMedicalCheckup(Number(debouncedVolunteerId)) : Promise.resolve(null)),
    enabled: !!debouncedVolunteerId,
    retry: false,
  });

  return {
    data,
    isLoading,
    refetch,
    volunteerId,
    setVolunteerId
  };
}
