import { lazy } from 'react';

const VoluntaryView = lazy(() => import('@/views/personal/Volunteers/VoluntariesView'));
const CreateAfiliationView = lazy(() => import ('@/views/personal/Volunteers/CreateAfiliationView'));

const RecruitmentPendingView = lazy(() => import( '@/views/personal/Recruitment/RecruitmentPendingView'));
const CreateRecruitmentView = lazy(() => import ('@/views/personal/Recruitment/CreateRecruitView'));
const EditRecruitmentView = lazy(() => import ('@/views/personal/Recruitment/EditRecruitView'));
const ApproveDenyRecruitView = lazy(() => import('@/views/personal/Recruitment/ApproveDenyRecruitView'));

const MilitaryPersonnelView = lazy(() => import('@/views/personal/military-personnel/MilitaryPersonnelListView'));

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
        path: '/volunteers/list',
        title:'Voluntarios',
        component: VoluntaryView
    },
    {
        path: '/volunteers/create',
        title:'Voluntarios',
        component: CreateAfiliationView
  },
  {
    path: '/military-personnel/list',
    title: 'Personal militar',
    component: MilitaryPersonnelView
    }
    
]

const routes = [...coreRoutes];
export default routes;