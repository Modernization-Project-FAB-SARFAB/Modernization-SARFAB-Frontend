import BackLink from "@/components/common/BackLink/BackLink";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useParams } from "react-router-dom";

export default function EditMedicalTreatment() {
    useBreadcrumb([{ label: "Tratamientos médicos", path: "/medical-treatment/list" }, { label: "Editar tratamiento" }]);

    const params = useParams();
    const medicalTreatmentId = params.medicalTreatmentId!;

    /*const { data, isLoading, isError } = useEditRecruit(recruitId);

    if (isLoading) return 'Cargando...';
    if (isError) return 'Error'; //<Navigate to="/404" />
    if (data) return <EditRecruitForm data={data} recruitId={Number(recruitId)} />*/
    return <>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <BackLink
                text="Volver a listado de tratamientos"
                iconSize={20}
                link="/medical-treatment/list"
            />
            
        </div>
    </>
}