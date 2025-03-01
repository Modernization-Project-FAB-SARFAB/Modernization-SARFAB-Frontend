import { Dialog, Transition } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

interface ApproveRecruitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ApproveRecruitModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalApprove = queryParams.get('approveRecruit')
    const show = modalApprove ? true : false;

    return (<Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => navigate('', {})}>
            {/* Fondo oscuro */}
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/60" />
            </Transition.Child>

            {/* Contenedor principal */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
                        <Dialog.Title className="font-black text-3xl text-gray-800 mb-4">
                            Aprobar recluta
                        </Dialog.Title>

                        <p className="text-lg font-semibold text-gray-600 mb-6">
                            Parece que quieres aprobar a un recluta.{" "}
                            <span className="text-fuchsia-600">¿Estás seguro de que desea aprobar a este recluta?</span>
                        </p>

                        {/* Botón de cierre */}
                        <button
                            onClick={() => navigate('', {})}
                            className=""
                        >
                            Cerrar
                        </button>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition>)
}
