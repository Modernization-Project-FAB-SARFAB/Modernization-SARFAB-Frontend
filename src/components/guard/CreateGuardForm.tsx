import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";
import FormDate from "@/components/common/FormDate/FormDate";
import FormSelectControlled from "../common/FormSelect/FormSelectControlled";
import BackLink from "../common/BackLink/BackLink";
import { GuardFormProps } from "../guard/types/GuardFormProps.type";
import FormInput from "../common/FormInput/FormInput";

export default function CreateGuardForm({ shiftData, errors, register, control }: GuardFormProps) {

    const shiftOptions = shiftData?.map((data: { shiftId: number; name: string; }) => ({
        value: data.shiftId,
        label: data.name
    }));

    return (
        <>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mx-5 items-start">
                <div className="h-auto gap-4 rounded-xl p-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <BackLink
                        text="Volver a listado de guardias"
                        iconSize={20}
                        link="/guards/list"
                    />
                    <h3 className="my-3 dark:text-white text-2xl font-semibold text-black">
                        Datos generales
                    </h3>
                    <div className="w-full flex flex-wrap gap-3">
                        <div className="mb-4.5 flex flex-col w-full md:flex-1">
                            <FormSelectControlled
                                control={control}
                                label="Persona que atendió"
                                required
                                name="shiftId"
                                options={shiftOptions && shiftOptions.length > 0
                                    ? shiftOptions
                                    : [{ value: 0, label: "No hay opciones" }]}
                            />

                            {errors.shiftId && (
                                <ErrorFormMessage>{errors.shiftId.message}</ErrorFormMessage>
                            )}
                        </div>
                        <div className="mb-4.5 flex flex-col w-full md:flex-1">
                            <FormDate label="Fecha de la guardia" placeholder="Selecciona la fecha" required
                                register={register}
                                name="guardDate" />
                            {errors.guardDate && (
                                <ErrorFormMessage>{errors.guardDate.message}</ErrorFormMessage>
                            )}
                        </div>
                    </div>
                    <div className="mb-4.5 flex flex-col">
                        <FormInput register={register} label="Ubicacion" required
                            placeholder="Ingresa la ubicación"
                            name="location" />
                        {errors.location && (
                            <ErrorFormMessage>{errors.location.message}</ErrorFormMessage>
                        )}
                    </div>
                </div>
                <div className="gap-4 p-4 rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <h3 className="my-3 dark:text-white text-2xl font-semibold text-black">
                        Asignación de rescatistas / voluntarios y responsable
                    </h3>

                </div>
            </div>
        </>
    )
}