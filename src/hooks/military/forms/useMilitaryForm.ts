import { CreateMilitaryForm } from "@/types/index";
import { useForm } from "react-hook-form";

export function useMilitaryForm(defaultValues: CreateMilitaryForm = { firstName: "", lastName: "", mobilePhone: null, militaryRankId: 0, status: 1 }) {
  return useForm<CreateMilitaryForm>({
    defaultValues,
  });
}
