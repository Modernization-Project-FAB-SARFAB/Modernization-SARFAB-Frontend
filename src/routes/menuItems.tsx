import { RiAccountBox2Fill, RiAlarmWarningFill, RiHome2Fill, RiShieldFill } from '@remixicon/react';
import { RiSettings2Fill, RiUserCommunityFill, RiFileLine, RiFirstAidKitFill } from 'react-icons/ri';

const menuItems: MenuItem[] = [
    {
        label: "Inicio",
        path: "/",
        icon: <RiHome2Fill size={18} color="white" />,
    },
    {
        label: "Reclutamiento",
        icon: <RiUserCommunityFill size={18} color="white" />,
        path: "/recruitment",
        subItems: [
            { label: "Lista de reclutas pendientes", path: "/recruitment/list" },
            { label: "Aprobar / Rechazar reclutas", path: "/recruitment/approve-or-deny" },
            { label: "Registrar recluta", path: "/recruitment/create" },
        ],
    },
    {
        label: "Voluntarios",
        icon: <RiAccountBox2Fill size={18} color="white" />,
        path: "/volunteers",
        subItems: [
            { label: "Ver voluntarios activos", path: "/volunteers/active-volunteers" },
            { label: "Historico de voluntarios", path: "/volunteers/volunteer-history" },
            { label: "Añadir nueva afiliación", path: "/volunteers/create" },
        ],
    },
    {
        label: "Personal militar",
        icon: <span className="material-symbols-outlined">military_tech</span>,
        path: "/military",
        subItems: [
            { label: "Ver personal militar", path: "/military/list" },
            { label: "Registrar personal militar", path: "?openMilitaryModal=true" },
        ],
    },
    {
        label: "Operaciones",
        icon: <RiAlarmWarningFill size={18} color="white" />,
        path: "/operations",
        subItems: [
            { label: "Lista de operaciones", path: "/operation/list" },
            { label: "Crear operación", path: "/operation/create" },
        ],
    },
    {
        label: "Guardias",
        icon: <RiShieldFill size={18} color="white" />,
        path: "/guards",
        subItems: [
            { label: "Lista de guardias", path: "/guards" },
            { label: "Crear guardia", path: "/guards/create" },
        ],
    },
    {
        label: "Inventario",
        icon: <RiFileLine size={18} color="white" />,
        path: "/inventory",
        subItems: [
            { label: "Lista de inventario", path: "/inventory" },
            { label: "Registrar nuevo elemento", path: "/inventory/create" },
            { label: "Registrar extracción", path: "/inventory/register-extraction" },
            { label: "Registrar devolución", path: "/inventory/register-return" },
        ]
    },
    {
        label: "Sanidad",
        icon: <RiFirstAidKitFill size={18} color="white" />,
        path: "/medical-treatment/list",
        subItems: [
            { label: "Lista de tratamientos", path: "/medical-treatment/list" },
            { label: "Registrar tratamiento", path: "/medical-treatment/create" },
        ]
    },
    {
        label: "Configuración",
        icon: <RiSettings2Fill size={18} color="white" />,
        path: "/configuration",
        subItems: [
            { label: "Tipos y categorias de operativo", path: "/configuration/types-and-categories" },
            { label: "Cursos", path: "/configuration/courses" },
            { label: "Solicitantes", path: "/configuration/applicant" },
        ]
    },
];

export default menuItems;