import BackLink from "@/components/common/BackLink/BackLink";
import FormDate from "@/components/common/FormDate/FormDate";
import FormInput from "@/components/common/FormInput/FormInput";
import SimpleSortableTable from "@/components/common/SimpleSortableTable/SimpleSortableTable";
import VolunteerCourseAssingModal from "@/components/volunteer/modals/VolunteerCourseAssingModal";
import VolunteerDischargeModal from "@/components/volunteer/modals/VolunteerDischargeModal";
import VolunteerGradePromotionModal from "@/components/volunteer/modals/VolunteerGradePromotionModal";
import VolunteerServiceCompletedModal from "@/components/volunteer/modals/VolunteerServiceCompletedModal";
import { volunteerMedicalCheckupColumnsDef } from "@/constants/volunteer/VolunteerMedicalCheckupColumnDef";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useDetailsVolunteer } from "@/hooks/volunteer/querys/useEditVolunteerData";
import { useVolunteerMedicalCheckup } from "@/hooks/volunteerMedicalCheckup/querys/useVolunteerMedicalCheckup";
import { RiClipboardFill } from "@remixicon/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DetailVolunteerView() {
  useBreadcrumb([{ label: "Voluntarios", path: "/volunteers/active-volunteers" }, { label: "Ver voluntario" }]);
  const navigate = useNavigate();
  const [modalAction, setModalAction] = useState<string | null>(null);

  const params = useParams();
  const volunteerId = params.volunteerId!;

  const handleOpenModal = (action: string) => {
    if (action === "promote") {
      navigate(`?gradePromotion=true&volunteerId=${volunteerId}`);
    } else if (action === "assignCourse") {
      navigate(`?assingCourse=true&volunteerId=${volunteerId}`);
    } else if (action === "serviceCompleted") {
      navigate(`?serviceCompleted=true&volunteerId=${volunteerId}`);
    }  else if (action === "dischargeVolunteer") {
      navigate(`?dischargeVolunteer=true&volunteerId=${volunteerId}`);
    }
    setModalAction(action);
  };



  const { data, isLoading, isError } = useDetailsVolunteer(volunteerId);
  const { data: medicalCheckupData } = useVolunteerMedicalCheckup( {initialVolunteerId: volunteerId});


  if (isLoading) return 'Cargando...';
  if (isError) return 'Error'; //<Navigate to="/404" />
  if (data) return <>
    <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-4 lg:gap-5 gap-3">
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:row-span-4 p-4">
        <BackLink
          text="Volver a listado de voluntarios"
          iconSize={20}
          link="/recruitment/approve-or-deny"
        />
        <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
          Datos personales
        </h3>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <FormInput label="Nombres"
                name="firstName"
                type="text"
                readonly
                defaultValue={data.firstName} />
            </div>

            <div className="w-full xl:w-1/2">
              <FormInput label="Apellidos"
                name="lastName"
                type="text"
                readonly
                defaultValue={data.lastName} />
            </div>
          </div>

          <div className="mb-4.5">
            <FormInput label="Documento de identidad"
              name="ci"
              type="text"
              readonly
              defaultValue={data.ci} />
          </div>

          <div className="mb-4.5">
            <FormDate
              label="Fecha de nacimiento"
              name="birthDate"
              readonly
              defaultValue={data.birthDate}
            />
          </div>

          <div className="mb-4.5">
            <FormInput label="Correo electronico"
              name="email"
              type="email"
              readonly
              defaultValue={data.email} />
          </div>

          <div className="mb-4.5">
            <FormInput
              label="Departamento"
              name="departmentId"
              readonly
              defaultValue={data}
            />
          </div>

          <div className="mb-4.5">
            <FormInput label="Dirección"
              name="homeAddress"
              type="text"
              readonly
              defaultValue={data.homeAddress} />
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <FormInput label="Teléfono"
                name="phone"
                type="tel"
                readonly
                defaultValue={data.phone} />
            </div>

            <div className="w-full xl:w-1/2">
              <FormInput label="Número de celular"
                name="mobilePhone"
                type="tel"
                readonly
                defaultValue={data.mobilePhone} />
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <FormInput
                label="Selecciona un grado"
                name="gradeName"
                readonly
                defaultValue={data.gradeName}
              />
            </div>

            <div className="w-full xl:w-1/2">
              <FormInput
                label="Tipo de voluntario"
                name="volunteerType"
                readonly
                defaultValue={data.volunteerType}
              />
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <FormInput label="Ocupación"
                name="occupation"
                type="text" readonly
                defaultValue={data.occupation} />
            </div>

            <div className="w-full xl:w-1/2">
              <FormInput label="Religion"
                name="religion"
                type="text" readonly
                defaultValue={data.religion} />
            </div>
          </div>

          <div className="mb-4.5">
            <FormInput label="Señas particulares"
              name="distinctiveFeatures"
              type="text" readonly
              defaultValue={data.distinctiveFeatures} />
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:row-span-1 p-4">
        <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
          Acciones
        </h3>
        <div className="flex flex-col gap-4 max-w-md mx-auto my-5">
          <div className="flex gap-4 w-full ">
            <button
              className="w-full bg-success text-white py-3 rounded-lg"
              onClick={() => handleOpenModal("promote")}
            >
              Promover voluntario
            </button>
            <button
              className="w-full border-2 border-success text-success py-3 rounded-lg"
              onClick={() => handleOpenModal("serviceCompleted")}
            >
              Cumplió el servicio
            </button>
          </div>
          <button
            className="w-full bg-meta-1 text-white py-3 rounded-lg"
            onClick={() => handleOpenModal("dischargeVolunteer")}
          >
            Dar de baja
          </button>
          <button
            className="w-full bg-primary text-white py-3 rounded-lg"
            onClick={() => handleOpenModal("assignCourse")}
          >
            Agregar nuevo curso a voluntario
          </button>
        </div>
      </div>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:row-span-1 p-4">
        <div className="flex-row items-center h-full justify-center p-6">
          <div className="px-6 mt-5">
            <h3 className=" dark:text-white text-2xl font-semibold text-black">Cantidad total de faltas</h3>
            <p className="text-gray-500">Total de faltas a operativos y guardias</p>
            <p className="text-title-xxl text-center font-bold text-primary mt-5">2 Faltas</p>
            <div className="flex justify-between items-center mt-6">
              <a href="#" className="text-primary text-lg">Ver registro</a>
              <button className="bg-gray-300 p-3 rounded-lg">
                <RiClipboardFill className="text-gray-700 w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:row-span-1 p-4">
        <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
          Reportes
        </h3>
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto my-5">
          <button className="w-full bg-primary text-white py-3 rounded-lg">
            Ver reporte de guardias
          </button>
          <button className="w-full bg-primary text-white py-3 rounded-lg">
            Ver reporte de operaciones
          </button>
          <button className="w-full bg-primary text-white py-3 rounded-lg">
            Ver cursos
          </button>
        </div>
      </div>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:row-span-2 p-4">
        <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
          En caso de emergencia
        </h3>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <FormInput label="Contacto de emergencia"
                name="emergencyContactFullName"
                type="text"
                readonly
                defaultValue={"recruit.firstName"} />
            </div>

            <div className="w-full xl:w-1/2">
              <FormInput label="Parentezco"
                name="emergencyContactRelation"
                type="text"
                readonly
                defaultValue={"recruit.firstName"} />
            </div>
          </div>
          <div className="mb-4.5">
            <FormInput label="Dirección del contacto"
              name="emergencyContactAddress"
              type="text"
              readonly
              defaultValue={"recruit.firstName"} />
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <FormInput label="Telefono de contacto de emergancia"
                name="emergencyContactPhone"
                type="text"
                readonly
                defaultValue={"recruit.firstName"} />
            </div>

            <div className="w-full xl:w-1/2">
              <FormInput label="Celular de contacto de emergancia"
                name="emergencyContactMobile"
                type="text"
                readonly
                defaultValue={"recruit.firstName"} />
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:row-span-1 lg:row-start-5 p-4">
        <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
          Datos medicos
        </h3>
        <div className="p-6.5">
          <div className="mb-4.5">
            <FormInput label="Alergias"
              name="allergies"
              type="text"
              readonly
              defaultValue={"recruit.firstName"} />
          </div>
          <div className="mb-4.5">
            <FormInput label="Grupo sanguineo"
              name="bloodType"
              type="text"
              readonly
              defaultValue={"recruit.firstName"} />
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark lg:col-span-2 lg:row-span-1 lg:row-start-6 p-4">
        
        <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
          Chequeos medicos
        </h3>
        {medicalCheckupData && (<SimpleSortableTable columns={volunteerMedicalCheckupColumnsDef}
                data={medicalCheckupData}
                initialPageSize={10}/>)}
      </div>
    </div>
    <VolunteerCourseAssingModal />
    <VolunteerGradePromotionModal />
    <VolunteerServiceCompletedModal />
    <VolunteerDischargeModal />
  </>
}