import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";
import FormDate from "@/components/common/FormDate/FormDate";
import FormInput from "@/components/common/FormInput/FormInput";
import { MedicalTreatmentFormProps } from "./types/MedicalTreatmentFormProps.types";

export default function MedicalTreatmentForm({ errors, register, control }: MedicalTreatmentFormProps) {

    return (
        <>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mx-5">
                <div className="flex flex-col gap-9">
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col">
                            <FormDate label="Fecha en la que se otorgó la atención" placeholder="Selecciona la fecha" required
                                register={register}
                                name="treatmentDate" />
                            {errors.treatmentDate && (
                                <ErrorFormMessage>{errors.treatmentDate.message}</ErrorFormMessage>
                            )}
                        </div>

                    </div>
                </div>
                <div className="flex flex-col gap-9">
                    <div className="p-6.5">
                        <FormInput label="Diagnóstico" placeholder="Diagnóstico" required
                            register={register}
                            errors={errors}
                            name="diagnosis"
                            type="text" />
                        {errors.diagnosis && (
                            <ErrorFormMessage>{errors.diagnosis?.message}</ErrorFormMessage>
                        )}
                    </div>
                    <div className="p-6.5">
                        <FormInput label="Descripción" placeholder="Descripción" required
                            register={register}
                            errors={errors}
                            name="description"
                            type="text" />
                        {errors.description && (
                            <ErrorFormMessage>{errors.description?.message}</ErrorFormMessage>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}