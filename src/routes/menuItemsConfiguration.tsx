import { RiUserSettingsFill } from "@remixicon/react";

const menuItemsConfiguration: MenuItem[] = [
    {
        label: "Administración",
        icon: <RiUserSettingsFill size={18} color="white" />,
        path: "/administración",
        subItems: [
            { label: "Usuarios", path: "/administración/usuarios" },
        ],
    }
];

export default menuItemsConfiguration;