import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../common/Modal/Modal";
import RecruitDetails from "./RecriutDetails";
import { useRecruitData } from "@/hooks/recruitment";

export default function DetailsRecruitModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalDeny = queryParams.get('viewRecruit');
    const recruitId = queryParams.get('recruitId');

    const { data, isLoading, error } = useRecruitData(recruitId);

    return (
        <Modal title="Detalles del recluta" isOpen={!!modalDeny} onClose={() => navigate(location.pathname, { replace: true })}>
            {
                isLoading ?
                    <><p>Cargando...</p></> :

                    <>{error || !data ?
                        <p>Error al cargar los datos del reclutamiento.</p> :
                        <>
                            <div className="p-7">
                                <RecruitDetails recruit={data} />
                            </div>
                        </>
                    }
                    </>
            }
        </Modal>

    );
}