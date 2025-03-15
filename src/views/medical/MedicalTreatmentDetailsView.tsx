import BackLink from "@/components/common/BackLink/BackLink";
import EditMedicalTreatmentForm from "@/components/medical/EditMedicalTreatmentForm";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useMedicalTreatmentForm } from "@/hooks/medical/forms/useMedicalTreatmentForm";
import { useGetMedicalTreatment } from "@/hooks/medical/querys/useGetMedicalTreatment";
import { MedicalTreatmentFormData } from "@/types/medicalTreatment.schema";
import { convertTodDataBaseFormatDate } from "@/utils/common/formatDate";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


export default function MedicalTreatmentDetailsView() {
    useBreadcrumb([{ label: "Tratamientos médicos", path: "/medical-treatment/list" }, { label: "Detalles de tratamiento" }]);
    const params = useParams();
    const medicalTreatmentId = params.medicalTreatmentId!;

    const { data, isLoading, isError } = useGetMedicalTreatment(Number(medicalTreatmentId));

    const { register, formState: { errors }, control, reset, watch } = useMedicalTreatmentForm(data as MedicalTreatmentFormData);

    useEffect(() => {
        if (data) {
            reset({
                ...data,
                treatmentDate: data.treatmentDate ? convertTodDataBaseFormatDate(data.treatmentDate) : ""
            });
        }
    }, [data, reset]);

    if (isLoading) return 'Cargando...';
    if (isError) return 'Error';
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <BackLink text="Volver a listado de tratamientos" iconSize={20} link="/medical-treatment/list" />
            <EditMedicalTreatmentForm register={register} errors={errors} control={control} readonly={true} watch={watch} />
        </div>
    );
}