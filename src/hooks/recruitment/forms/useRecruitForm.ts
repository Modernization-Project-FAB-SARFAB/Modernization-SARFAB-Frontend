import { RecruitmentFormData } from "@/types/index";
import { useForm } from "react-hook-form";

export function useRecruitForm(defaultValues: RecruitmentFormData) {
  return useForm<RecruitmentFormData>({
    defaultValues,
  });
}
