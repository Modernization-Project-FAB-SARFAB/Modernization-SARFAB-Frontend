import { VolunteerFormData } from "@/types/volunteer.schema";
import { useForm } from "react-hook-form";

export function useVolunteerForm(defaultValues: VolunteerFormData) {
  return useForm<VolunteerFormData>({
    defaultValues,
  });
}
