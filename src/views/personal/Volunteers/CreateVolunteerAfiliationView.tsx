import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import VolunteerForm from "@/components/volunteer/forms/VolunteerForm";
import VolunteerFormWithRecruit from "@/components/volunteer/forms/VolunteerFormWithRecruit";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useRecruitData, useUpdateRecruitStatus } from "@/hooks/recruitment";
import { useVolunteerForm } from "@/hooks/volunteer";
import { useCreateVolunteer } from "@/hooks/volunteer/mutations/useCreateVolunteer";
import { VolunteerFormData } from "@/types/volunteer.schema";
import { useState, useEffect } from "react";

export default function CreateVolunteerAfiliationView() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useBreadcrumb([{ label: "Voluntarios", path: "/volunteers/active-volunteers" }, { label: "Registrar afiliación de voluntario" }]);

  const queryParams = new URLSearchParams(location.search);
  const recruitId = queryParams.get('recruitId');

  // Función para obtener valores iniciales
  const getInitialValues = (recruitData?: any): VolunteerFormData => ({
    firstName: "",
    lastName: "",
    homeAddress: "",
    ci: "",
    birthDate: "",
    phone: "",
    mobilePhone: "",
    email: "",
    distinctiveFeatures: "",
    volunteerType: "",
    occupation: "",
    bloodType: "",
    religion: "",
    allergies: "",
    emergencyContactFullName: "",
    emergencyContactRelation: "",
    emergencyContactAddress: "",
    emergencyContactPhone: "",
    emergencyContactMobile: "",
    departmentId: "",
    gradeId: "",
    checkupDate: "",
    expirationDate: "",
    observations: ""
  });

  const { register, handleSubmit, formState: { errors }, control, setValue } = useVolunteerForm(getInitialValues());

  const { mutate } = useUpdateRecruitStatus();
  const mutation = useCreateVolunteer();

  const { data: recruitData, isLoading, isError } = useRecruitData(recruitId);

  const handleForm = async (formData: VolunteerFormData) => {
    setIsSubmitting(true);
    try {
      await mutation.mutateAsync(formData);
      if (recruitId) {
        await mutate({ recruitId: Number(recruitId), status: 3 });
      }
    } catch (error) {
      console.error("Error al registrar voluntario", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    if (!recruitId) {
      return (
        <VolunteerForm errors={errors} register={register} control={control} />
      );
    }

    if (isLoading) return <p>Cargando datos del recluta...</p>;
    if (isError) return <p>Error al cargar los datos del recluta.</p>;

    return (<>
      <VolunteerFormWithRecruit
        errors={errors}
        register={register}
        control={control}
        setValue={setValue}
        recruit={recruitData}
        typeVolunteer={recruitData.wantsMilitaryService ? 'Libretista' : 'Voluntario'}
      />
      <ButtonGroup
        buttons={[
          {
            type: "button",
            label: "Registrar voluntario",
            onClick: handleSubmit(handleForm),
            variant: "primary",
            disabled: isSubmitting,
            isLoading: isSubmitting,
          },
          {
            type: "link",
            label: "Cancelar",
            to: recruitId ? "/recruitment/approve-or-deny" : "/volunteers/active-volunteers",
          },
        ]}
      />
    </>
    );
  };

  return (
    <form onSubmit={handleSubmit(handleForm)} noValidate>
      {renderForm()}
    </form>
  );
}
