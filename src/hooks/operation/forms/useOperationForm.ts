import { CreateOperationForm } from "@/types/operation.schema";
import { useForm } from "react-hook-form";

export function useOperationForm(defaultValues: CreateOperationForm) {
    return useForm<CreateOperationForm>({
        defaultValues,
    });
}