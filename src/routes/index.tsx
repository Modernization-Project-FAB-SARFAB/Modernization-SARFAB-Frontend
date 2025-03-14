import { lazy } from 'react';

const ActiveVolunteersView = lazy(() => import('@/views/personal/Volunteers/ActiveVolunteersView'));
const CreateAfiliationView = lazy(() => import ('@/views/personal/Volunteers/CreateVolunteerAfiliationView'));

const RecruitmentPendingView = lazy(() => import( '@/views/personal/Recruitment/RecruitmentPendingView'));
const CreateRecruitmentView = lazy(() => import ('@/views/personal/Recruitment/CreateRecruitView'));
const EditRecruitmentView = lazy(() => import ('@/views/personal/Recruitment/EditRecruitView'));
const ApproveDenyRecruitView = lazy(() => import ('@/views/personal/Recruitment/ApproveDenyRecruitView'));

const coreRoutes = [
    {
        path: '/recruitment/list',
        title:'Reclutamiento',
        component: RecruitmentPendingView
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
        path: '/volunteers/active-volunteers',
        title:'Voluntarios',
        component: ActiveVolunteersView
    },
    {
        path: '/volunteers/create',
        title:'Voluntarios',
        component: CreateAfiliationView
    },
    
]

const routes = [...coreRoutes];
export default routes;