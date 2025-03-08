import { MilitaryListComponent } from "@/components/military/MilitaryListComponent";
import { militaryColumnsDef as columns } from "@/constants/military/militaryColumnsDef";

export default function MilitaryListView() {
    return (
        <MilitaryListComponent
            breadcrumb={[{ label: "Personal Militar", path: "/military/list" }, { label: "Listado de personal militar" }]}
            initialStatusFilter="1"
            columns={columns}
            modalComponent={<div>Detalles de militar (Placeholder)</div>}
        />
    );
}
