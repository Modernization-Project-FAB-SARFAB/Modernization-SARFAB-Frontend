import BackLink from "@/components/common/BackLink/BackLink";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import { useState } from "react";
import RecruitForm from "@/components/recruitment/RecruitForm";
import { RecruitmentFormData } from "@/types/index";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useRecruitForm, useCreateRecruit } from "@/hooks/recruitment";

function CreateRecruitView() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useBreadcrumb([{ label: "Reclutamiento", path: "/recruitment/list" }, { label: "Registrar nuevo recluta" },]);

  const initialValues: RecruitmentFormData = {
    firstName: "",
    lastName: "",
    ci: "",
    birthDate: "",
    wantsMilitaryService: false
  };

  const { register, handleSubmit, formState: { errors }, control } = useRecruitForm(initialValues);
  const mutation = useCreateRecruit();

  const handleForm = async (formData: RecruitmentFormData) => {
    setIsSubmitting(true);
    await mutation.mutateAsync(formData)
  }

  return (
    <>
      <div className="">
        <div className="">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <BackLink
              text="Volver a listado de reclutas"
              iconSize={20}
              link="/recruitment/list"
            />
            <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
              Registro de nuevo recluta
            </h3>
            <form onSubmit={handleSubmit(handleForm)} noValidate>
              <RecruitForm errors={errors} register={register} control={control} />
              <div className="p-6.5">
                <ButtonGroup label={"Registrar recluta"}
                  onPrimaryClick={handleSubmit(handleForm)}
                  primaryDisabled={isSubmitting}
                  primaryIsLoading={isSubmitting}
                  cancelLink='/recruitment/list' isPrimarySubmit={true} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateRecruitView;