import { InventoryListComponent } from "@/components/inventory/InventoryListComponent";
import { InventoryColumnsDef as columns } from "@/constants/inventory/InventoryColumnsDef";

export default function InventoryListView() {
  return (
    <InventoryListComponent
      breadcrumb={[{ label: "Inventario", path: "/inventory/list" }, { label: "Lista de inventario"
      }]}
      columns={columns}
    />
  );
}