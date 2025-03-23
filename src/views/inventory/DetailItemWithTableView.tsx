import Button from "@/components/common/Button/Button";
import ItemDetailsWithTable from "@/components/inventory/ItemDetailsWithTable";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useItemWithPendingTable } from "@/hooks/inventory/querys/useItemWithPendingTable";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ItemFormModal } from '@/components/inventory/modals/ItemFormModal';
import { ItemMovementModal } from "@/components/inventory/modals/ItemMovementModal";
import { useExtractItem } from "@/hooks/inventory/mutations/useExtractItem";
import { useReturnItem } from "@/hooks/inventory/mutations/useReturnItem";

export default function DetailItemWithTableView() {
  useBreadcrumb([
    { label: 'Inventario', path: '/inventory/list' },
    { label: 'Detalle del item' },
  ]);

  const { itemId } = useParams();
  const itemIdNumber = Number(itemId);

  const queryClient = useQueryClient();
  const { data: item, isLoading: isLoadingItem } = useItemWithPendingTable(itemIdNumber);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const extractItemMutation = useExtractItem();
  const returnItemMutation = useReturnItem();

  const openEditModal = searchParams.get('openItemModal') === 'true';
  const itemIdParam = searchParams.get('itemId');
  const openMovementModal = searchParams.get('openItemMovementModal') === 'true';
  const isReturn = searchParams.get('isReturn') === 'true';
  const closeModal = () => {
    navigate(location.pathname);
    queryClient.invalidateQueries({ queryKey: ['item-with-pending-table', itemIdNumber] });
  };
  const handleCloseMovementModal = () => {
    searchParams.delete('openItemMovementModal');
    searchParams.delete('itemId');
    searchParams.delete('isReturn');
    navigate(location.pathname);
    queryClient.invalidateQueries({ queryKey: ['item-with-pending-table', itemIdNumber] });
  };

  return isLoadingItem ? (
    <p className="text-center text-gray-500">Cargando datos...</p>
  ) : (
    <section className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Detalle del elemento</h2>
      <section className="flex flex-col md:flex-row gap-6">
        <article className="flex-1">
          {item && <ItemDetailsWithTable item={item} />}
        </article>
        <article className="flex-1">
          <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
            <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
              Acciones
            </h2>
            <article className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-10">
              <Link to={`/inventory/movement-historical?search=${encodeURIComponent(item?.name || '')}`}>
                <Button label="Ir al registro histórico" classname="w-full text-sm" />
              </Link>
              <Link to={`?openItemModal=true&itemId=${itemIdNumber}`}>
                <Button label="Editar elemento" classname="w-full text-sm" />
              </Link>
              <div className="flex flex-col md:col-span-2">
                <Link to={`?openItemMovementModal=true&itemId=${itemIdNumber}&isReturn=true`}>
                  <Button label="Registrar devolución" classname="w-full text-sm" />
                </Link>
              </div>
              <div className="flex flex-col md:col-span-2">
                <Link to={`?openItemMovementModal=true&itemId=${itemIdNumber}`}>
                  <Button label="Registrar extracción" classname="w-full text-sm" />
                </Link>
              </div>
            </article>
          </div>
        </article>
      </section>
      <ItemFormModal
        isOpen={openEditModal}
        onClose={closeModal}
        itemId={Number(itemIdParam)}
      />
      <ItemMovementModal
        isOpen={openMovementModal}
        onClose={handleCloseMovementModal}
        itemId={Number(itemIdParam)}
        isReturn={isReturn}
        title={`${isReturn ? "Registrar devolución de" : "Registrar extracción de"}: ${item?.name || `Item #${itemId}`}`}
        isLoading={
          isReturn ? returnItemMutation.isPending : extractItemMutation.isPending
        }
        onSubmit={async (data) => {
          if (isReturn) {
            await returnItemMutation.mutateAsync(data);
          } else {
            await extractItemMutation.mutateAsync(data);
          }
          queryClient.invalidateQueries({ queryKey: ["inventory-items"] });
          handleCloseMovementModal();
        }}
      />

    </section>
  );
}