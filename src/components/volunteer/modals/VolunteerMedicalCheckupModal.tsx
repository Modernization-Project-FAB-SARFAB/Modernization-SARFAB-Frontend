import Button from "@/components/common/Button/Button";
import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";
import FormDate from "@/components/common/FormDate/FormDate";
import FormInput from "@/components/common/FormInput/FormInput";
import Modal from "@/components/common/Modal/Modal";
import { useVolunteerMedicalCheckupForm } from "@/hooks/volunteerMedicalCheckup/forms/useVolunteerMedicalCheckupForm";
import { useCreateVolunteerMedicalCheckup } from "@/hooks/volunteerMedicalCheckup/mutations/useCreateVolunteerMedicalCheckup";
import { MedicalCheckupVolunteerFormData } from "@/types/volunteerMedicalCheckup";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VolunteerMedicalCheckupModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const volunteerId = Number(queryParams.get("volunteerId"));
    console.log(volunteerId);
    
    const isAssingCourseModal = queryParams.get("add-medical-checkup");
    const isOpen = !!isAssingCourseModal;

    const initialValues = {
        volunteerId: volunteerId,
        checkupDate: "",
        expirationDate: "",
        observations: ""
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors }, control } = useVolunteerMedicalCheckupForm(initialValues);
    const mutation = useCreateVolunteerMedicalCheckup();

    const handleForm = async (formData: MedicalCheckupVolunteerFormData) => {
        setIsSubmitting(true);
        await mutation.mutateAsync(formData)
    }

    return (
        <Modal title={"Agregar nuevo chequeo medico"} isOpen={isOpen} onClose={() => navigate(location.pathname, { replace: true })}>
            <p className="text-lg font-thin text-gray-600 mb-6">
                Parece que quieres asignar un nuevo chequeo medico a este voluntario.
                <span className="text-body font-semibold"> Llena los datos respectivos</span> para agregar los un nuevo chequeo medico.
            </p>

            <form onSubmit={handleSubmit(handleForm)} noValidate>
                <div className="w-full">
                    <input type="text" name="volunteerId" value={volunteerId} hidden/>
                    <FormDate
                        label="Fecha de realización del chequeo medico"
                        placeholder="Ingresa la fecha en la que se realizó el reclutamiento"
                        required
                        register={register}
                        name="checkupDate"
                    />
                    {errors.checkupDate && (
                        <ErrorFormMessage>{errors.checkupDate.message}</ErrorFormMessage>
                    )}
                </div>
                <div className="w-full">
                    <FormDate
                        label="Fecha de caducidad del chequeo medico"
                        placeholder="Ingres la fecha de caducidad del reclutamiento"
                        required
                        register={register}
                        name="expirationDate"
                    />
                    {errors.expirationDate && (
                        <ErrorFormMessage>{errors.expirationDate.message}</ErrorFormMessage>
                    )}
                </div>
                <div className="mb-4.5">
                    <FormInput label="Observaciones" placeholder="Observaciones sobre el chequeo"
                        register={register}
                        errors={errors}
                        name="observations"
                        type="text" />
                    {errors.observations && (
                        <ErrorFormMessage>{errors.observations.message}</ErrorFormMessage>
                    )}
                </div>

                <div className="flex justify-end gap-4.5 mt-6">
                    <Button
                        label={isSubmitting ? "Procesando..." : "Agregar chequeo medico"}
                        type="submit"
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                    />

                    <button
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        onClick={() => navigate(location.pathname, { replace: true })}
                        type="button"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </Modal >
    )
}