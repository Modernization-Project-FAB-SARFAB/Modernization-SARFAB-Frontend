import { GuardFormData } from "@/types/guard.schema";
import { Control, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

export interface GuardFormProps {
    shiftData: { shiftId: number; name: string; }[] | undefined;
    errors: FieldErrors<GuardFormData>;
    register: UseFormRegister<GuardFormData>;
    control: Control<GuardFormData>;
    watch?: UseFormWatch<GuardFormData>
    readonly?: boolean;
}