import { getRecruitById } from "@/api/RecruitmentAPI";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function DetailsRecruitView() {
  const params = useParams();
  const recruitId = params.recruitId!;
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['editRecruit', recruitId],
    queryFn: () => getRecruitById(Number(recruitId)),
    retry: false
  });

  if (isLoading) return 'Cargando...';
  if (isError) return 'Error'; //<Navigate to="/404" />
  if (data) return (
    <>
      <h1 className="">{data.nombre}</h1>
    </>
  )
}

export default DetailsRecruitView;