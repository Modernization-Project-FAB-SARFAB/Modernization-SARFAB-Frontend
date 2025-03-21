import { useSearchParams } from "react-router-dom";
import { InventoryListComponent } from "@/components/inventory/InventoryListComponent";
import { InventoryColumnsDef as columns } from "@/constants/inventory/InventoryColumnsDef";
import { ItemFormModal } from "@/components/inventory/modals/ItemFormModal";

export default function InventoryListView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const openItemModal = searchParams.get("openItemModal") === "true";
  const itemId = Number(searchParams.get("itemId"));

  const handleCloseModal = () => {
    searchParams.delete("openItemModal");
    searchParams.delete("itemId");
    setSearchParams(searchParams);
  };

  return (
    <>
      <InventoryListComponent
        breadcrumb={[
          { label: "Inventario", path: "/inventory/list" },
          { label: "Lista de inventario" },
        ]}
        columns={columns}
      />
      <ItemFormModal isOpen={openItemModal} onClose={handleCloseModal} itemId={itemId} />
    </>
  );
}
