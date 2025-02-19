import { lazy } from 'react';

const VoluntaryView = lazy(() => import('@/views/personal/volunteers').then(module => ({ default: module.VoluntariesView })));
const CreateAfiliationView = lazy(() => import ('@/views/personal/volunteers').then(module => ({ default: module.CreateAfiliationView })));

const RecruitmentView = lazy(() => import ('@/views/personal/recruitment').then(module => ({ default: module.RecruitmentView })));

const coreRoutes = [
    {
        path: '/voluntarios',
        title:'Voluntarios',
        component: VoluntaryView
    },
    {
        path: '/voluntarios/create',
        title:'Agregar afiliación',
        component: CreateAfiliationView
    },
    {
        path: '/reclutamiento/aspirantes',
        title:'Aspirantes',
        component: CreateAfiliationView
    },
    {
        path: '/reclutamiento/aspirantes/create',
        title:'Agregar aspirantes a recluta',
        component: CreateAfiliationView
    },
    {
        path: '/reclutamiento',
        title:'Reclutas activos',
        component: RecruitmentView
    }
]

const routes = [...coreRoutes];
export default routes;