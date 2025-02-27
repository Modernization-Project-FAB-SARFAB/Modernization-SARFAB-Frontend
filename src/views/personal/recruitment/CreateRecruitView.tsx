import BackLink from "@/components/common/BackLink/BackLink";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import RecruitForm from "@/components/recruitment/RecruitForm";
import { RecruitmentFormData } from "@/types/index";
import { createRecruitment } from "@/api/RecruitmentAPI";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function CreateRecruitView() {
  const navigate = useNavigate();
  const { setBreadcrumbItems } = useOutletContext<{ setBreadcrumbItems: Function }>();

  const initialValues: RecruitmentFormData = {
    firstName: "",
    lastName: "",
    ci: "",
    birthDate: "",
    wantsMilitaryService: false
  };
  const { register, handleSubmit, formState: { errors }, control } = useForm<RecruitmentFormData>({
    defaultValues: initialValues
  });

  const mutation = useMutation({
    mutationFn: createRecruitment,
    onError: (error) => {
      toast.error("Ocurrió un error al registrar el recluta");
    },
    onSuccess: (data) => {
      toast.success("Recluta registrado correctamente");
      navigate('/recruitment/list');
    }
  })

  const handleForm = async (formData: RecruitmentFormData) => {
    await mutation.mutateAsync(formData)
  }

  useEffect(() => {
    setBreadcrumbItems([
      { label: "Reclutamiento", path: "/recruitment/list" },
      { label: "Registrar nuevo recluta" },
    ]);
  }, [setBreadcrumbItems]);

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
              <RecruitForm errors={errors} register={register} control={control}/>
              <div className="p-6.5">
                <ButtonGroup label={"Registrar recluta"} onPrimaryClick={handleSubmit(handleForm)} cancelLink='/recruitment/list' isPrimarySubmit={true} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateRecruitView;