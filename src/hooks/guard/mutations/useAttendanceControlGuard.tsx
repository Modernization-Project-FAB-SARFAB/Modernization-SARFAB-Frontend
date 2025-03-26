import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { attendanceControlGuard } from "@/api/GuardAPI";

export function useAttendanceControlGuard() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: attendanceControlGuard,
        onError: () => toast.error("Ocurrió un error al registrar la asistencia"),
        onSuccess: () => {
            toast.success("Se regsitro la asistencia correctamente");
            navigate("/guards/list");
        },
    });
}