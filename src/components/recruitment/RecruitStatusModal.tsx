import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useRecruitData, useUpdateRecruitStatus } from "@/hooks/recruitment";
import Modal from "../common/Modal/Modal";
import RecruitDetails from "./RecriutDetails";
import Button from "../common/Button/Button";

export default function RecruitStatusModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const recruitId = queryParams.get("recruitId");
    const isApproveModal = queryParams.get("approveRecruit");
    const isDenyModal = queryParams.get("denyRecruit");
    const isOpen = !!isApproveModal || !!isDenyModal;

    const action = isApproveModal ? "approve" : "deny";
    const status = isApproveModal ? 2 : 0;
    const title = isApproveModal ? "Aprobar recluta" : "Rechazar recluta";
    const confirmText = isApproveModal ? "APROBAR RECLUTA" : "RECHAZAR RECLUTA";
    const loadingText = isApproveModal ? "Aprobando..." : "Rechazando...";
    const message = isApproveModal
        ? "¿Estás seguro de que deseas aprobar a este recluta?"
        : "¿Estás seguro de que deseas rechazar a este recluta?";

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data, isLoading, error } = useRecruitData(recruitId);
    const { mutate } = useUpdateRecruitStatus();

    const handleSubmit = () => {
        if (!recruitId) return;
        setIsSubmitting(true);
        mutate({ recruitId: Number(recruitId), status }, { onSettled: () => setIsSubmitting(false) });
    };

    return (
        <Modal title={title} isOpen={isOpen} onClose={() => navigate(location.pathname, { replace: true })}>
            {
                isLoading ?
                    <><p>Cargando...</p></> :

                    <>{error || !data ?
                        <p>Error al cargar los datos del reclutamiento.</p> :
                        <>
                            <p className="text-lg font-semibold text-gray-600 mb-6">
                                Parece que quieres {action === "approve" ? "aprobar" : "rechazar"} a un recluta.{" "}
                                <span className="text-fuchsia-600">{message}</span>
                            </p>

                            <div className="p-7">
                                <RecruitDetails recruit={data} />

                                <div className="flex justify-end gap-4.5 mt-6">
                                    <Button
                                        label={isSubmitting ? loadingText : confirmText}
                                        onClick={handleSubmit}
                                        type="submit"
                                        disabled={isSubmitting}
                                        isLoading={isSubmitting}
                                    />
                                    <button
                                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                        onClick={() => navigate(location.pathname, { replace: true })}
                                        type="button"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div></>
                    }
                    </>
            }
        </Modal>
    );
}
