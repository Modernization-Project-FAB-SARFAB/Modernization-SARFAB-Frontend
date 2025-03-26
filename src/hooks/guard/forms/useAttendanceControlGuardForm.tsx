import { AttendanceGuardFormData } from "@/types/guard.schema";
import { useForm } from "react-hook-form";

export function useAttendanceControlGuardForm(defaultValues: Partial<AttendanceGuardFormData>) {
    return useForm<AttendanceGuardFormData>({
        defaultValues: defaultValues || {
            guardId: 0,
            volunteerAttendances: []
        },
    });
}