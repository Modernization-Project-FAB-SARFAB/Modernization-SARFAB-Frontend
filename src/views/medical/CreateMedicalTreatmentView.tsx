import BackLink from "@/components/common/BackLink/BackLink";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import MedicalTreatmentForm from "@/components/medical/MedicalTreatmentForm";
import { useMedicalTreatmentForm } from "@/hooks/medical/forms/useMedicalTreatmentForm";
import { useCreatedMedicalTreatment } from "@/hooks/medical/mutations/useCreatedMedicalTreatment";
import { MedicalTreatmentFormData } from "@/types/medical";
import { useState } from "react";

export default function CreateMedicalTreatmentView() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialValues: MedicalTreatmentFormData = {
        treatmentDate: "",
        diagnosis: "",
        description: "",
        attendingPersonId: 0,
        patientPersonId: 0
    };

    const { register, handleSubmit, formState: { errors }, control } = useMedicalTreatmentForm(initialValues);
    const mutation = useCreatedMedicalTreatment();

    const handleForm = async (formData: MedicalTreatmentFormData) => {
        console.log(formData)
        setIsSubmitting(true);
        await mutation.mutateAsync(formData)
    }

    return (
        <>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <BackLink
                    text="Volver a listado de tratamientos"
                    iconSize={20}
                    link="/medical-treatment/list"
                />
                <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
                    Registro de nuevo tratamiento médico
                </h3>
                <form onSubmit={handleSubmit(handleForm)} noValidate>
                    <MedicalTreatmentForm register={register} errors={errors} control={control} />
                    <div className="p-6.5">
                        <ButtonGroup
                            buttons={[
                                { type: "button", label: "Registrar tratamiento", onClick: handleSubmit(handleForm), variant: "primary", disabled: isSubmitting, isLoading: isSubmitting },
                                { type: "link", label: "Cancelar", to: "/medical-treatment/list" }
                            ]}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}