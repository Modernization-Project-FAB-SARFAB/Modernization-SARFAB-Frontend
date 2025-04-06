import Button from "@/components/common/Button/Button";
import Modal from "@/components/common/Modal/Modal";
import { useDischargeVolunteer } from "@/hooks/volunteer/mutations/useDischargeVolunteer";
import { useServiceCompletedVolunteer } from "@/hooks/volunteer/mutations/useServiceCompletedVolunteer";
import { useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VolunteerDischargeModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

    const volunteerId = useMemo(() => Number(queryParams.get("volunteerId")), [queryParams]);
    const isDismissalModal = queryParams.get("dischargeVolunteer");
    const isOpen = Boolean(isDismissalModal);

    const [dischargeReason, setDischargeReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { mutate } = useDischargeVolunteer();

    const handleConfirmDismissal = useCallback(() => {
        if (!dischargeReason.trim()) return;

        setIsSubmitting(true);
        mutate(
            { volunteerId, formData: { status: 0, dischargeReason } },
            {
                onSettled: () => {
                    setIsSubmitting(false);
                },
            }
        );
    }, [mutate, volunteerId, dischargeReason]);

    return (
        <Modal
            title="Dar de baja a voluntario"
            isOpen={isOpen}
            onClose={() => navigate(location.pathname, { replace: true })}
        >
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4">
                ¿Estás seguro de que deseas dar de baja a este voluntario?
            </p>

            <label htmlFor="dischargeReason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Motivo de la baja:
            </label>
            <input
                id="dischargeReason"
                type="text"
                value={dischargeReason}
                onChange={(e) => setDischargeReason(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke py-3 px-5 pr-10 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default :bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Escribe el motivo..."
            />

            <div className="flex justify-end gap-4 mt-6">
                <Button
                    label="Confirmar Baja"
                    onClick={handleConfirmDismissal}
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                />
                <button
                    className="flex justify-center rounded border border-gray-300 py-2 px-6 font-medium text-gray-700 hover:shadow-md dark:border-gray-600 dark:text-white"
                    onClick={() => navigate(location.pathname, { replace: true })}
                    type="button"
                >
                    Cancelar
                </button>
            </div>
        </Modal>
    );
}
