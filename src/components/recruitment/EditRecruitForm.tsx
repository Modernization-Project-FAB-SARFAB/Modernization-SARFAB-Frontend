import BackLink from "@/components/common/BackLink/BackLink";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import RecruitForm from "@/components/recruitment/RecruitForm";
import { EditRecruitFormProps } from "@/components/recruitment/types/EditRecruitFormProps.types";
import { useEditRecruitForm } from "@/hooks/recruitment";

export default function EditRecruitForm({ data, recruitId }: EditRecruitFormProps) {
    const { register, handleSubmit, errors, control, isSubmitting, handleForm } = useEditRecruitForm(data, recruitId);

    return (
        <>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <BackLink
                    text="Volver a listado de reclutas"
                    iconSize={20}
                    link="/recruitment/list"
                />
                <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
                    Editar recluta
                </h3>
                <form onSubmit={handleSubmit(handleForm)} noValidate>
                    <RecruitForm errors={errors} register={register} control={control} />
                    <div className="p-6.5">
                        <ButtonGroup
                            buttons={[
                                { type: "button", label: "Editar recluta", onClick: handleSubmit(handleForm), variant: "primary", disabled: isSubmitting, isLoading: isSubmitting },
                                { type: "link", label: "Cancelar", to: "/recruitment/list" }
                            ]}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}