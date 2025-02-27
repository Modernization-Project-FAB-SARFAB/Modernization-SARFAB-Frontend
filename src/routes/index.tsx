import { EditRecruitView } from '@/views/personal/recruitment';
import { lazy } from 'react';

const VoluntaryView = lazy(() => import('@/views/personal/volunteers').then(module => ({ default: module.VoluntariesView })));
const CreateAfiliationView = lazy(() => import ('@/views/personal/volunteers').then(module => ({ default: module.CreateAfiliationView })));

const RecruitmentView = lazy(() => import ('@/views/personal/recruitment').then(module => ({ default: module.RecruitmentView })));
const CreateRecruitmentView = lazy(() => import ('@/views/personal/recruitment').then(module => ({ default: module.CreateRecruitView })));
const EditRecruitmentView = lazy(() => import ('@/views/personal/recruitment').then(module => ({ default: module.EditRecruitView })));
const ApproveDenyRecruitView = lazy(() => import ('@/views/personal/recruitment').then(module => ({ default: module.ApproveDenyRecruitView })));

const coreRoutes = [
    {
        path: '/recruitment/list',
        title:'Reclutamiento',
        component: RecruitmentView
    },  
    {
        path: '/recruitment/approve-or-deny',
        title:'Aprobar o rechazar recluta',
        component: ApproveDenyRecruitView
    },
    {
        path: '/recruitment/create',
        title:'Registrar nuevo recluta',
        component: CreateRecruitmentView
    },
    {
        path: '/recruitment/:recruitId/edit',
        title:'Editar recluta',
        component: EditRecruitmentView
    },
    {
        path: '/volunteers/list',
        title:'Voluntarios',
        component: VoluntaryView
    },
    {
        path: '/volunteers/create',
        title:'Voluntarios',
        component: CreateAfiliationView
    },
    
]

const routes = [...coreRoutes];
export default routes;