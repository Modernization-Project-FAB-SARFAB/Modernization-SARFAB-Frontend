import { RiIdCardLine } from "@remixicon/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRecruitById } from "@/api/RecruitmentAPI";
import FormInput from "../common/FormInput/FormInput";
import FormDate from "../common/FormDate/FormDate";
import Modal from "../common/Modal/Modal";

export default function DenyRecruitModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalDeny = queryParams.get('denyRecruit');
    const recruitId = queryParams.get('recruitId');

    const { data, isLoading, error } = useQuery({
        queryKey: ['editRecruit', recruitId],
        queryFn: () => getRecruitById(Number(recruitId)),
        enabled: !!recruitId,
        retry: false
    });

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    if (error || !data) {
        return <p>Error al cargar los datos del reclutamiento.</p>;
    }

    return (
        <Modal title="Rechazar recluta" isOpen={!!modalDeny} onClose={() => navigate(location.pathname, { replace: true })}>
            <p className="text-lg font-semibold text-gray-600 mb-6">
                Parece que quieres rechazar a un recluta.{" "}
                <span className="text-fuchsia-600">¿Estás seguro de que desea rechazar a este recluta?</span>
            </p>

            <div className="p-7">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                        <FormInput
                            label="Nombres"
                            placeholder="Ingresa los nombres"
                            name="firstName"
                            type="text"
                            readonly={true}
                            defaultValue={data.firstName}
                            className="bg-gray"
                        />
                    </div>

                    <div className="w-full sm:w-1/2">
                        <FormInput
                            label="Apellidos"
                            placeholder="Ingresa los apellidos"
                            name="lastName"
                            type="text"
                            readonly={true}
                            defaultValue={data.lastName}
                            className="bg-gray"
                        />
                    </div>
                </div>

                <div className="mb-5.5">
                    <FormInput
                        label="Documento de identidad - C.I."
                        placeholder="Ingresa el documento de identidad"
                        name="ci"
                        type="text"
                        readonly={true}
                        defaultValue={data.ci}
                        className="bg-gray"
                        icon={<RiIdCardLine />}
                    />
                </div>

                <div className="mb-5.5">
                    <FormDate
                        label="Fecha de nacimiento"
                        placeholder="Ingresa la fecha de nacimiento del recluta"
                        name="birthDate"
                        readonly={true}
                        defaultValue={data.birthDate}
                        className="bg-gray"
                    />
                </div>
                <div className="mb-5.5">
                    <FormInput
                        label="¿Desea realizar el servicio militar?"
                        placeholder="Sí / No"
                        name="wantsMilitaryService"
                        type="text"
                        readonly={true}
                        defaultValue={data.wantsMilitaryService ? "Sí" : "No"}
                        className="bg-gray"
                    />
                </div>

                <div className="flex justify-end gap-4.5">
                    <button
                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                        type="submit"
                        disabled
                    >
                        RECHAZAR RECLUTA
                    </button>
                    <button
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        onClick={() => navigate(location.pathname, { replace: true })}
                        type="button"
                    >
                        Cancelar
                    </button>

                </div>
            </div>
        </Modal>

    );
}
