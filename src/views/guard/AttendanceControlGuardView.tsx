import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import AttendanceControlGuard from "@/components/guard/AttendanceGuard";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useAttendanceControlGuardForm } from "@/hooks/guard/forms/useAttendanceControlGuardForm";
import { useAttendanceControlGuard } from "@/hooks/guard/mutations/useAttendanceControlGuard";
import { useGetGuard } from "@/hooks/guard/querys/useGetGuard";
import { AttendanceGuardFormData, VolunteerAttendance } from "@/types/guard.schema";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function AttendanceControlGuardView() {
    useBreadcrumb([{ label: "GUARDIAS", path: "/guards/list" }, { label: "Detalles de guardia" }]);
    const params = useParams();
    const guardId = params.guardId!;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [volunteerAttendances, setVolunteerAttendances] = useState<VolunteerAttendance[]>([]);

    const { data, isLoading, isError } = useGetGuard(Number(guardId));
    const mutation = useAttendanceControlGuard();

    const { formState: { errors }, setError, handleSubmit } = useAttendanceControlGuardForm({
        guardId: 0,
        volunteerAttendances: []
    });

    const handleForm = async (formData: AttendanceGuardFormData) => {
        setIsSubmitting(true);


        formData.guardId = Number(guardId);

        if (volunteerAttendances.length === 0) {
            setError('volunteerAttendances', { type: 'manual', message: 'Debe asignar la asistencia' });
            setIsSubmitting(false);
            return;
        }

        formData.volunteerAttendances = volunteerAttendances;

        await mutation.mutateAsync(formData).catch(() => setIsSubmitting(false));
    };

    if (isLoading) return 'Cargando...';
    if (isError) return 'Error';
    return (
        <form onSubmit={handleSubmit(handleForm)} noValidate>
            <AttendanceControlGuard data={data} volunteerAttendances={volunteerAttendances} setVolunteerAttendances={setVolunteerAttendances} errors={errors} />
            <div className="p-6.5">
                <ButtonGroup
                    buttons={[
                        { type: "button", label: "Guardar control de asistencia", onClick: handleSubmit(handleForm), variant: "primary", disabled: isSubmitting, isLoading: isSubmitting },
                        { type: "link", label: "Cancelar", to: "/guards/list" }
                    ]}
                />
            </div>
        </form>
    );
}