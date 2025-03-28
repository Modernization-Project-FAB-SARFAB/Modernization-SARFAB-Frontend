import { lazy } from 'react';
import EditOperationView from '../views/operation/EditOperationView';

const VoluntaryView = lazy(() => import('@/views/personal/Volunteers/VoluntariesView'));
const CreateAfiliationView = lazy(() => import('@/views/personal/Volunteers/CreateAfiliationView'));

const RecruitmentPendingView = lazy(() => import('@/views/personal/Recruitment/RecruitmentPendingView'));
const CreateRecruitmentView = lazy(() => import('@/views/personal/Recruitment/CreateRecruitView'));
const EditRecruitmentView = lazy(() => import('@/views/personal/Recruitment/EditRecruitView'));
const ApproveDenyRecruitView = lazy(() => import('@/views/personal/Recruitment/ApproveDenyRecruitView'));

// Military
const MilitaryView = lazy(() => import('@/views/personal/military/MilitaryListView'));

// Operations
const OperationsView = lazy(() => import('@/views/operation/OperationListView'));
const CreateOperationView = lazy(() => import('@/views/operation/CreateOperationView'));
const EditOperationView = lazy(() => import('@/views/operation/EditOperationView'));


//Medical treatment
const MedicalTreatmentView = lazy(() => import('@/views/medical/MedicalTreatmentView'))
const CreateMedicalTreatmentView = lazy(() => import('@/views/medical/CreateMedicalTreatmentView'))
const EditMedicalTreatmentView = lazy(() => import('@/views/medical/EditMedicalTreatmentView'))
const MedicalTreatmenDetailstView = lazy(() => import('@/views/medical/MedicalTreatmentDetailsView'))

//Guard
const GuardListView = lazy(() => import('@/views/guard/GuardListView'))
const CreateGuardFormView = lazy(() => import('@/views/guard/CreateGuardView'))
const GuardDetailsView = lazy(() => import('@/views/guard/GuardDetailsView'))
const EditGuardView = lazy(() => import('@/views/guard/EditGuardView'))
const AttendanceGuardView = lazy(() => import('@/views/guard/AttendanceControlGuardView'))

//User
const UserListView = lazy(() => import('@/views/user/UserListView'))

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
        path: '/volunteers/list',
        title: 'Voluntarios',
        component: VoluntaryView
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
    {
        path: '/operation/:operationId/edit',
        title: 'Editar operación',
        component: EditOperationView
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
    },
    //Guards
    {
        path: '/guards/list',
        title: 'Guardias',
        component: GuardListView
    },
    {
        path: '/guards/create',
        title: 'Registrar guardias',
        component: CreateGuardFormView
    },
    {
        path: '/guards/:guardId',
        title: 'Ver guardia',
        component: GuardDetailsView
    },
    {
        path: '/guards/:guardId/edit',
        title: 'Editar guardia',
        component: EditGuardView
    },
    {
        path: '/guards/:guardId/attendance',
        title: 'Editar guardia',
        component: AttendanceGuardView
    },
    {
        path: '/administration/users',
        title: 'Lista de usuarios',
        component: UserListView
    }
]

const routes = [...coreRoutes];
export default routes;