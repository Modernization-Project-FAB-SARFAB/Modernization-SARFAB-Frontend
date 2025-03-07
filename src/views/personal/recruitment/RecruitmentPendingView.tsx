import DetailsRecruitModal from "@/components/recruitment/DetailsRecruitModal";
import { RecruitmentListView } from "@/components/recruitment/RecruitmentListView";
import { recruitmentColumnsDef as columns } from "@/constants/recruitment/RecruitmentColumnsDef";

export default function RecruitmentPendingView() {
    return (
        <RecruitmentListView
            breadcrumb={[{ label: "Reclutamiento", path: "/recruitment/list" }, { label: "Listado de reclutas pendientes" }]}
            initialStatusFilter="2"
            columns={columns}
            modalComponent={<DetailsRecruitModal />}
        />
    );
}
