import { lazy } from 'react';

const ActiveVolunteersView = lazy(() => import('@/views/personal/Volunteers/ActiveVolunteersView'));
const CreateAfiliationView = lazy(() => import ('@/views/personal/Volunteers/CreateVolunteerAfiliationView'));

const RecruitmentPendingView = lazy(() => import('@/views/personal/Recruitment/RecruitmentPendingView'));
const CreateRecruitmentView = lazy(() => import('@/views/personal/Recruitment/CreateRecruitView'));
const EditRecruitmentView = lazy(() => import('@/views/personal/Recruitment/EditRecruitView'));
const ApproveDenyRecruitView = lazy(() => import('@/views/personal/Recruitment/ApproveDenyRecruitView'));

// Military
const MilitaryView = lazy(() => import('@/views/personal/military/MilitaryListView'));

// Operations
const OperationsView = lazy(() => import('@/views/operation/OperationListView'));
const CreateOperationView = lazy(() => import('@/views/operation/CreateOperationView'));


//Medical treatment
const MedicalTreatmentView = lazy(() => import('@/views/medical/MedicalTreatmentView'))
const CreateMedicalTreatmentView = lazy(() => import('@/views/medical/CreateMedicalTreatmentView'))
const EditMedicalTreatmentView = lazy(() => import('@/views/medical/EditMedicalTreatmentView'))
const MedicalTreatmenDetailstView = lazy(() => import('@/views/medical/MedicalTreatmentDetailsView'))

const coreRoutes = [
    {
        path: '/recruitment/list',
        title: 'Reclutamiento',
        component: RecruitmentPendingView
    },
    {
        path: '/recruitment/approve-or-deny',
        title: 'Aprobar o rechazar recluta',
        component: ApproveDenyRecruitView
    },
    {
        path: '/recruitment/create',
        title: 'Registrar nuevo recluta',
        component: CreateRecruitmentView
    },
    {
        path: '/recruitment/:recruitId/edit',
        title: 'Editar recluta',
        component: EditRecruitmentView
    },
    {
        path: '/volunteers/active-volunteers',
        title:'Voluntarios',
        component: ActiveVolunteersView
    },
    {
        path: '/volunteers/create',
        title: 'Voluntarios',
        component: CreateAfiliationView
  },
  // Military
  {
    path: '/military/list',
    title: 'Personal militar',
    component: MilitaryView
  },
  // Operations
  {
    path: '/operation/list',
    title: 'Operaciones',
    component: OperationsView
  },
  {
    path: '/operation/create',
    title: 'Crear operación',
    component: CreateOperationView
  },

    //MedicalTreatments
    {
        path: '/medical-treatment/list',
        title: 'Tratamientos médicos',
        component: MedicalTreatmentView
    },
    {
        path: '/medical-treatment/create',
        title: 'Editar tratamiento médico',
        component: CreateMedicalTreatmentView
    },
    {
        path: '/medical-treatment/:medicalTreatmentId/edit',
        title: 'Editar tratamiento médico',
        component: EditMedicalTreatmentView
    },
    {
        path: '/medical-treatment/:medicalTreatmentId',
        title: 'Ver tratamiento médico',
        component: MedicalTreatmenDetailstView
    }

]

const routes = [...coreRoutes];
export default routes;