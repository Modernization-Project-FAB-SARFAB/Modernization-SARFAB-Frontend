import { VolunteerUpdateFormData, volunteerFormSchema } from "@/types/volunteer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useVolunteerUpdateForm(defaultValues: VolunteerUpdateFormData) {
  console.log(defaultValues);
  console.log(volunteerFormSchema);
  return useForm<VolunteerUpdateFormData>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues,
  });
}
