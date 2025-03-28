import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { DeleteUserModal } from "@/components/user/DeleteUserModal";
import { PasswordRecoveryByAdminModal } from "@/components/user/PasswordRecoveryByAdminModal";
import UpdateUserModal from "@/components/user/UpdateUserModal";
import { UserSchema } from "@/types/user.schema";
import { RiCloseCircleLine, RiEdit2Line, RiEyeFill, RiListCheck3 } from "@remixicon/react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

const statusConfig: Record<number, { text: string; className: string }> = {
    0: { text: "Desactivado", className: "bg-warning text-warning" },
    1: { text: "Habilitado", className: "bg-success text-success" },
};

export const userColumnDef: ColumnDef<UserSchema>[] = [

    { header: "Nombre completo", accessorKey: "fullName" },
    { header: "Nombre de usuario", accessorKey: "userName" },
    { header: "Correo electrónico", accessorKey: "email" },
    {
        header: "Estado",
        accessorKey: "status",
        cell: ({ getValue }) => {
            const value = getValue<number>();
            const { text, className } = statusConfig[value] || {
                text: "Desconocido",
                className: "bg-gray-400 text-gray-600",
            };
            return (
                <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-semibold ${className}`}>
                    {text}
                </span>
            );
        },
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => <ActionsColumn row={row} />,
        enableSorting: false,
    }
];

const ActionsColumn = ({ row }: { row: any }) => {
    const [isModalOpen, setIsModalOpen] = useState<number>(0);

    const [userId, setUserId] = useState<number | null>(
        null,
    );

    const openModal = (operationId: number, modal: number) => {
        setUserId(operationId);
        setIsModalOpen(modal);
    };

    const closeModal = () => {
        setIsModalOpen(0);
        setUserId(null);
    };

    return (
        <>
            <DropdownMenu
                items={[
                    {
                        type: "link", label: "Editar usuario",
                        onClick: () => openModal(row.original.userId, 3),
                        icon: <RiEdit2Line size={20} />
                    },
                    {
                        type: "link", label: "Ver usuario",
                        onClick: () => openModal(row.original.userId, 4),
                        icon: <RiEyeFill size={20} />
                    },
                    {
                        type: "link", label: "Restaurar contraseña",
                        onClick: () => openModal(row.original.userId, 2),
                        icon: <RiListCheck3 size={20} />
                    },
                    ...(row.original.status !== 0
                        ? ([
                            {
                                type: 'button' as const,
                                label: 'Eliminar usuario',
                                onClick: () => openModal(row.original.userId, 1),
                                icon: <RiCloseCircleLine size={20} />,
                            },
                        ] as const)
                        : []),
                ]}
            />
            {
                (userId !== null && isModalOpen === 1) &&
                <DeleteUserModal isOpen={isModalOpen === 1} onClose={closeModal} userId={userId} />
            }
            {
                (userId !== null && isModalOpen === 2) &&
                <PasswordRecoveryByAdminModal isOpen={isModalOpen === 2} onClose={closeModal} userId={userId} />
            }
            {
                (userId !== null && (isModalOpen === 3 || isModalOpen === 4)) &&
                <UpdateUserModal isOpen={isModalOpen === 3 || isModalOpen === 4} onClose={closeModal} userId={userId} readonly={isModalOpen === 4} />
            }
        </>
    );
};