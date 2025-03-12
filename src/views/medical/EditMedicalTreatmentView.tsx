import { MedicalTreatmentAPIType } from "@/api/types/MedicalTreatmentAPIType.type";
import BackLink from "@/components/common/BackLink/BackLink";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import EditMedicalTreatmentForm from "@/components/medical/EditMedicalTreatmentForm";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useMedicalTreatmentForm } from "@/hooks/medical/forms/useMedicalTreatmentForm";
import { useEditMedicalTreatment } from "@/hooks/medical/mutations/useEditMedicalTreatment";
import { useGetMedicalTreatment } from "@/hooks/medical/querys/useGetMedicalTreatment";
import { MedicalTreatmentFormData } from "@/types/medicalTreatment.schema";
import { convertTodDataBaseFormatDate } from "@/utils/common/formatDate";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditMedicalTreatment() {
    useBreadcrumb([{ label: "Tratamientos médicos", path: "/medical-treatment/list" }, { label: "Editar tratamiento" }]);

    const params = useParams();
    const medicalTreatmentId = params.medicalTreatmentId!;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data, isLoading, isError } = useGetMedicalTreatment(Number(medicalTreatmentId));

    const mutation = useEditMedicalTreatment();

    const { register, handleSubmit, formState: { errors }, control, reset, watch } = useMedicalTreatmentForm(data as MedicalTreatmentFormData);

    useEffect(() => {
        if (data) {
            reset({
                ...data,
                treatmentDate: data.treatmentDate ? convertTodDataBaseFormatDate(data.treatmentDate) : ""
            });
        }
    }, [data, reset]);

    const handleForm = async (formData: MedicalTreatmentFormData) => {
        setIsSubmitting(true);

        const newData: MedicalTreatmentAPIType = {
            formData,
            medicalTreatmentId: Number(medicalTreatmentId) // Convertir a number
        };

        await mutation.mutateAsync(newData).catch(() => setIsSubmitting(false));
    };

    if (isLoading) return 'Cargando...';
    if (isError) return 'Error';
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <BackLink text="Volver a listado de tratamientos" iconSize={20} link="/medical-treatment/list" />
            <form onSubmit={handleSubmit(handleForm)} noValidate>
                <EditMedicalTreatmentForm register={register} errors={errors} control={control} readonly={false} watch={watch} />
                <div className="p-6.5">
                    <ButtonGroup
                        buttons={[
                            { type: "button", label: "Actualizar tratamiento", onClick: handleSubmit(handleForm), variant: "primary", disabled: isSubmitting, isLoading: isSubmitting },
                            { type: "link", label: "Cancelar", to: "/medical-treatment/list" }
                        ]}
                    />
                </div>
            </form>
        </div>
    );
}