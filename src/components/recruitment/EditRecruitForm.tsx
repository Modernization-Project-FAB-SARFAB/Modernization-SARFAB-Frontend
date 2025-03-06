import { RecruitmentFormData } from "@/types/index";
import BackLink from "@/components/common/BackLink/BackLink";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import RecruitForm from "@/components/recruitment/RecruitForm";
import { EditRecruitFormProps } from "@/components/recruitment/types/EditRecruitFormProps.types";
import { useState } from "react";
import { useRecruitForm, useUpdateRecruit } from "@/hooks/recruitment";

export default function EditRecruitForm({ data, recruitId }: EditRecruitFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors }, control } = useRecruitForm({
        firstName: data.firstName,
        lastName: data.lastName,
        ci: data.ci,
        birthDate: data.birthDate,
        wantsMilitaryService: data.wantsMilitaryService
    });

    const { mutate } = useUpdateRecruit();

    const handleForm = (formData: RecruitmentFormData) => {
        setIsSubmitting(true);
        mutate({ formData, recruitId }, { onSettled: () => setIsSubmitting(false) });
    };

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
                        <ButtonGroup label={"Editar recluta"}
                            onPrimaryClick={handleSubmit(handleForm)}
                            primaryDisabled={isSubmitting}
                            primaryIsLoading={isSubmitting}
                            cancelLink='/recruitment/list'
                            isPrimarySubmit={true} />
                    </div>
                </form>
            </div>
        </>
    )
}