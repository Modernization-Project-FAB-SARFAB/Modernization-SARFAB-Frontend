import { GuardFormData, ShiftList, VoluntareeGuard } from "@/types/guard.schema";
import { VolunteerWithRankList } from "@/types/operationContext.schema";
import { Control, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

export interface GuardFormProps {
    setVoluntareeIds?: (value: number[]) => void;
    volunteersData: VolunteerWithRankList | undefined;
    shiftData: ShiftList | undefined;
    errors: FieldErrors<GuardFormData>;
    register: UseFormRegister<GuardFormData>;
    control: Control<GuardFormData>;
}