import { GuardFormData, guardFormDataSchema } from "@/types/guard.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useGuardForm(defaultValues: Partial<GuardFormData>) {
    return useForm<GuardFormData>({
        resolver: zodResolver(guardFormDataSchema),
        defaultValues: defaultValues || {
            guardDate: '',
            shiftId: 0,
            responsibleId: 0,
            location: '',
            voluntareeIds: []
        },
    });
}