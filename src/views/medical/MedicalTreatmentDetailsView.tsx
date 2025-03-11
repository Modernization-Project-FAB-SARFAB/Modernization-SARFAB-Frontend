import BackLink from "@/components/common/BackLink/BackLink";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useParams } from "react-router-dom";


export default function MedicalTreatmentDetailsView() {
    useBreadcrumb([{ label: "Tratamientos médicos", path: "/medical-treatment/list" }, { label: "Detalles de tratamiento" }]);
    const params = useParams();
    const medicalTreatmentId = params.medicalTreatmentId!;
    return (
        <>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <BackLink
                    text="Volver a listado de tratamientos"
                    iconSize={20}
                    link="/medical-treatment/list"
                />
                <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
                    Datos generales
                </h3>
            </div>
        </>
    )
}