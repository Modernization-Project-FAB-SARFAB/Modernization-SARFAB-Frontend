import { lazy } from 'react';

const VoluntaryView = lazy(() => import('@/views/personal/volunteers').then(module => ({ default: module.VoluntariesView })));
const CreateAfiliationView = lazy(() => import ('@/views/personal/volunteers').then(module => ({ default: module.CreateAfiliationView })));

const RecruitmentView = lazy(() => import ('@/views/personal/recruitment').then(module => ({ default: module.RecruitmentView })));

const coreRoutes = [
    {
        path: '/volunteers',
        title:'Voluntarios',
        component: VoluntaryView
    },
    {
        path: '/volunteers/create',
        title:'Voluntarios',
        component: CreateAfiliationView
    },
    {
        path: '/recruitment',
        title:'Agregar afiliación',
        component: RecruitmentView
    }
]

const routes = [...coreRoutes];
export default routes;