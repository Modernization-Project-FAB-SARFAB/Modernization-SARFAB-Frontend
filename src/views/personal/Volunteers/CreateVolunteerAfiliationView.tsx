import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import VolunteerForm from "@/components/volunteer/VolunteerForm";
import VolunteerFormWithRecruit from "@/components/volunteer/VolunteerFormWithRecruit";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useRecruitData } from "@/hooks/recruitment";
import { useVolunteerForm } from "@/hooks/volunteer";
import { useCreateVolunteer } from "@/hooks/volunteer/mutations/useCreateRecruit";
import { VolunteerFormData } from "@/types/volunteer.schema";
import { useState } from "react";

export default function CreateVolunteerAfiliationView() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useBreadcrumb([{ label: "Voluntarios", path: "/volunteers/active-volunteers" }, { label: "Registrar afiliación de voluntario" }]);
  
  const queryParams = new URLSearchParams(location.search);
  const recruitId = queryParams.get('recruitId');

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
    volunteerType: recruitId 
      ? (recruitData?.wantsMilitaryService ? '0' : '1') 
      : "",
    occupation: "",
    bloodType: "",
    religion: "",
    allergies: "",
    emergencyContactFullName: "",
    emergencyContactRelation: "",
    emergencyContactAddress: "",
    emergencyContactPhone: "",
    emergencyContactMobile: "",
    departmentId: 0,
    gradeId: 0,
    checkupDate: "",
    expirationDate: "",
    observations: ""
  });

  const { register, handleSubmit, formState: { errors }, control, setValue } = useVolunteerForm(getInitialValues());
  const mutation = useCreateVolunteer();

  const handleForm = async (formData: VolunteerFormData) => {
    setIsSubmitting(true);
    await mutation.mutateAsync(formData);
  }

  if (!recruitId) {
    return (
      <form onSubmit={handleSubmit(handleForm)} noValidate>
        <VolunteerForm errors={errors} register={register} control={control} />
        <ButtonGroup
          buttons={[
            { type: "button", label: "Registrar voluntario", onClick: handleSubmit(handleForm), variant: "primary", disabled: isSubmitting, isLoading: isSubmitting },
            { type: "link", label: "Cancelar", to: "" }
          ]}
        />
      </form>
    );
  }

  // Si hay recruitId, ahora sí traemos los datos
  const { data: recruitData, isLoading, isError } = useRecruitData(recruitId);

  if (isLoading) return <p>Cargando datos del recluta...</p>;

  if (isError) return <p>Error al cargar los datos del recluta.</p>;

  return (
    <form onSubmit={handleSubmit(handleForm)} noValidate>
      <VolunteerFormWithRecruit 
        errors={errors} 
        register={register} 
        control={control} 
        setValue={setValue} 
        recruit={recruitData} 
      />
      <ButtonGroup
        buttons={[
          { type: "button", label: "Registrar voluntario", onClick: handleSubmit(handleForm), variant: "primary", disabled: isSubmitting, isLoading: isSubmitting },
          { type: "link", label: "Cancelar", to: "" }
        ]}
      />
    </form>
  );
}
