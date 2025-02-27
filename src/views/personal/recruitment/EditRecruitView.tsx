import { getRecruitById } from "@/api/RecruitmentAPI";
import EditRecruitForm from "@/components/recruitment/EditRecruitForm";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";

function EditRecruitView() {
  const { setBreadcrumbItems } = useOutletContext<{ setBreadcrumbItems: Function }>();
  const params = useParams();
  const recruitId = params.recruitId!;
  
  useEffect(() => {
    setBreadcrumbItems([
      { label: "Reclutamiento", path: "/recruitment/list" },
      { label: "Editar recluta" }
    ]);
  }, [setBreadcrumbItems]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['editRecruit', recruitId],
    queryFn: () => getRecruitById(Number(recruitId)),
    retry: false
  });

  if (isLoading) return 'Cargando...';
  if (isError) return 'Error'; //<Navigate to="/404" />
  if (data) return <EditRecruitForm data={data} recruitId={Number(recruitId)}/>
}

export default EditRecruitView;