import Button from "@/components/common/Button/Button";
import Modal from "@/components/common/Modal/Modal";
import { useServiceCompletedVolunteer } from "@/hooks/volunteer/mutations/useServiceCompletedVolunteer";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VolunteerServiceCompletedModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const volunteerId = Number(queryParams.get("volunteerId"));
    const isServiceCompletedModal = queryParams.get("serviceCompleted");
    const isOpen = !!isServiceCompletedModal;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { mutate } = useServiceCompletedVolunteer();

    const handleConfirm = useCallback(() => {
        setIsSubmitting(true);
        mutate(
            { volunteerId, formData: { status: 2, dischargeReason: "" } },
            {
                onSettled: () => {
                    setIsSubmitting(false);
                    navigate(location.pathname, { replace: true });
                },
            }
        );
    }, [mutate, volunteerId, navigate, location.pathname]);

    return (
        <Modal
            title="Servicio Cumplido"
            isOpen={isOpen}
            onClose={() => navigate(location.pathname, { replace: true })}
        >
            <p className="text-lg font-semibold text-gray-600 mb-6">
                Este voluntario ha cumplido con su servicio.
            </p>
            <div className="flex justify-end gap-4.5 mt-6">
                <Button
                    label="Confirmar"
                    onClick={handleConfirm}
                    type="submit"
                    isLoading={isSubmitting}
                />
                <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    onClick={() => navigate(location.pathname, { replace: true })}
                    type="button"
                >
                    Cerrar
                </button>
            </div>
        </Modal>
    );
}
