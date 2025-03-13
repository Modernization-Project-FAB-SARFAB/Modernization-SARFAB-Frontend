import { OperationListComponent } from "@/components/operation/OperationListComponent";
import OperationMessageModal from "@/components/operation/OperationMessageModal";
import { OperationColumnsDef as columns } from "@/constants/operation/OperationColumnsDef";

export default function OperationListView() {
    return (
        <OperationListComponent
            breadcrumb={[{ label: "Operaciones", path: "/operations/list" }, { label: "Lista de operaciones" }]}
            initialStatusFilter="1"
            columns={columns}
            modalComponent={<OperationMessageModal />}
        />
    );
}