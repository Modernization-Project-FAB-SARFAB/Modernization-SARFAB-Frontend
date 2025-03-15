import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";
import FormDate from "@/components/common/FormDate/FormDate";
import FormSelectControlled from "../common/FormSelect/FormSelectControlled";
import FormTextArea from "../common/FormTextArea/FormTextArea";
import { EditMedicalTreatmentFormProps } from "./types/EditMedicalTreatmentFormProps.types";

const options = [
    { value: 8, label: 'Juan Perez' },
    { value: 9, label: 'Carlos Perez' },
    { value: 11, label: 'Marco Perez' },
]

export default function EditMedicalTreatmentForm({ errors, register, control, readonly, watch }: EditMedicalTreatmentFormProps) {
    return (
        <>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mx-5">
                <div className="flex flex-col gap-4">
                    <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
                        Datos generales
                    </h3>
                    <div className="mb-4.5 flex flex-col">
                        <FormDate label="Fecha en la que se otorgó la atención" placeholder="Selecciona la fecha" required
                            register={register}
                            name="treatmentDate"
                            defaultValue={watch("treatmentDate")}
                            readonly={readonly} />
                        {errors.treatmentDate && (
                            <ErrorFormMessage>{errors.treatmentDate.message}</ErrorFormMessage>
                        )}
                    </div>
                    <div className="mb-4.5 flex flex-col">
                        <FormSelectControlled
                            control={control}
                            label="Persona que atendió"
                            required
                            name="attendingPersonId"
                            options={options}
                            defaultValue={watch("attendingPersonId")}
                            readonly={readonly}
                        />
                        {errors.attendingPersonId && (
                            <ErrorFormMessage>{errors.attendingPersonId.message}</ErrorFormMessage>
                        )}
                    </div>
                    <div className="mb-4.5 flex flex-col">
                        <FormSelectControlled
                            control={control}
                            label="Persona que recibió el tratamiento"
                            required
                            name="patientPersonId"
                            options={options}
                            defaultValue={watch("patientPersonId")}
                            readonly={readonly}
                        />
                        {errors.patientPersonId && (
                            <ErrorFormMessage>{errors.patientPersonId.message}</ErrorFormMessage>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
                        Datos generales
                    </h3>
                    <div className="mb-4.5">
                        <FormTextArea label="Diagnóstico" placeholder="Diagnóstico" required
                            register={register}
                            errors={errors}
                            name="diagnosis"
                            className="h-70"
                            defaultValue={watch('diagnosis')}
                            readonly={readonly} />
                        {errors.diagnosis && (
                            <ErrorFormMessage>{errors.diagnosis?.message}</ErrorFormMessage>
                        )}
                    </div>
                    <div>
                        <FormTextArea label="Descripción" placeholder="Descripción" required
                            register={register}
                            errors={errors}
                            name="description"
                            defaultValue={watch('description')}
                            className="h-70"
                            readonly={readonly} />
                        {errors.description && (
                            <ErrorFormMessage>{errors.description?.message}</ErrorFormMessage>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}