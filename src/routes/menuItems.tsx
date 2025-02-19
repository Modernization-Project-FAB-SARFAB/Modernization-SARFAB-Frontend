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
        path: "/reclutas",
        subItems: [
            { label: "Lista de reclutas", path: "/reclutas" },
            { label: "Aprobar / Rechazar reclutas", path: "/reclutas/approve-or-deny" },
            { label: "Registrar recluta", path: "/reclutas/create" },
        ],
    },
    {
        label: "Voluntarios",
        icon: <RiAccountBox2Fill size={18} color="white" />,
        path: "/voluntarios",
        subItems: [
            { label: "Ver voluntarios activos", path: "/voluntarios" },
            { label: "Historico de voluntarios", path: "/voluntarios/volunteer-history" },
            { label: "Añadir nueva afiliación", path: "/voluntarios/create" },
        ],
    },
    {
        label: "Personal militar",
        icon: <span className="material-symbols-outlined">military_tech</span>,
        path: "/personal-militar",
        subItems: [
            { label: "Ver personal militar", path: "/personal-militar" },
            { label: "Registrar personal militar", path: "/personal-militar/create" },
        ],
    },
    {
        label: "Operaciones",
        icon: <RiAlarmWarningFill size={18} color="white" />,
        path: "/operaciones",
        subItems: [
            { label: "Lista de operaciones", path: "/operaciones" },
            { label: "Crear operación", path: "/operaciones/create" },
        ],
    },
    {
        label: "Guardias",
        icon: <RiShieldFill size={18} color="white" />,
        path: "/guardias",
        subItems: [
            { label: "Lista de guardias", path: "/guardias" },
            { label: "Crear guardia", path: "/guardias/create" },
        ],
    },
    {
        label: "Inventario",
        icon: <RiFileLine size={18} color="white"/>,
        path: "/inventario",
        subItems: [
            { label: "Lista de inventario", path: "/inventario" },
            { label: "Registrar nuevo elemento", path: "/inventario/create" },
            { label: "Registrar extracción", path: "/inventario/register-extraction" },
            { label: "Registrar devolución", path: "/inventario/register-return" },
        ]
    },
    {
        label: "Sanidad",
        icon: <RiFirstAidKitFill size={18} color="white" />,
        path: "/sanidad",
        subItems: [
            { label: "Lista de tratamientos", path: "/sanidad" },
            { label: "Registrar tratamiento", path: "/sanidad/create" },
        ]
    },
    {
        label: "Configuración",
        icon: <RiSettings2Fill size={18} color="white" />,
        path: "/configuracion",
        subItems: [
            { label: "Tipos y categorias de operativo", path: "/configuracion/types-and-categories" },
            { label: "Cursos", path: "/configuracion/courses" },
            { label: "Solicitantes", path: "/configuracion/applicant" },
        ]
    },
];

export default menuItems;