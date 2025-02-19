import { RiHome2Fill } from '@remixicon/react';
import { RiSettings2Fill, RiUserFill, RiUserCommunityFill, RiCustomerService2Fill, RiFileLine, RiFirstAidKitFill } from 'react-icons/ri';

const menuItems: MenuItem[] = [
    {
        label: "Inicio",
        path: "/",
        icon: <RiHome2Fill size={18} color="white" />,
    },
    {
        label: "Voluntarios",
        icon: <RiUserFill size={18} color="white" />,
        path: "/voluntarios",
        subItems: [
            { label: "Ver voluntarios", path: "/voluntarios" },
            { label: "Añadir afiliación", path: "/voluntarios/create" },
        ],
    },
    {
        label: "Reclutamiento",
        path: "/reclutamiento",
        icon: <RiUserCommunityFill size={18} color="white" />,
        subItems: [
            { label: "Ver aspirantes", path: "/reclutamiento/listar-aspirantes" },
            { label: "Añadir recluta", path: "/reclutamiento/agregar-recluta" },
            { label: "Ver reclutas activos", path: "/reclutamiento" },
        ],
    },
    {
        label: "Operaciones",
        path: "/operaciones",
        icon: <RiCustomerService2Fill size={18} color="white" />,
    },
    {
        label: "Logística e Inventario",
        path: "/reclutas",
        icon: <RiFileLine size={18} color="white" />,
    },
    {
        label: "Sanidad",
        path: "/reclutas",
        icon: <RiFirstAidKitFill size={18} color="white" />,
    },
    {
        label: "Configuración",
        path: "/configuracion",
        icon: <RiSettings2Fill size={18} color="white" />,
    },
];

export default menuItems;