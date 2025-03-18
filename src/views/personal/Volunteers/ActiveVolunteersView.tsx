import VolunteerActiveListView from '@/components/volunteer/views/VolunteerActiveListView'
import { volunteerColumnsDef as columns } from "@/constants/volunteer/VolunteersActivColumnDef";

export default function ActiveVolunteersView() {
  return (
    <VolunteerActiveListView
      breadcrumb={[{ label: "Voluntarios", path: "/volunteers/active-volunteers" }, { label: "Listado de voluntarios activos" }]}
      columns={columns}
    />
  )
}