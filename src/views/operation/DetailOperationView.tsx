import { useQueryClient } from "@tanstack/react-query";
import OperationDetails from '@/components/operation/OperationDetails';
import OperationPersonnelDetail from '@/components/operation/OperationPersonnelDetail';
import { useBreadcrumb } from '@/hooks/components/useBreadcrumb';
import { useGetOperationDetail } from '@/hooks/operation/querys/useGetOperationDetail';
import { useParams } from 'react-router-dom';

export default function DetailOperationView() {
  useBreadcrumb([
    { label: 'Operaciones', path: '/operation/list' },
    { label: 'Detalle de la operación' },
  ]);

  const { operationId } = useParams<{ operationId: string }>();
  const operationIdNumber = Number(operationId);

  const queryClient = useQueryClient();
  const { data: operation, isLoading: isLoadingOperation } =
    useGetOperationDetail(operationIdNumber);

    const refetchOperation = () => queryClient.invalidateQueries({ queryKey: ["operationDetail", operationIdNumber] });

  return isLoadingOperation ? (
    <p className="text-center text-gray-500">Cargando datos...</p>
  ) : (
    <section className="container mx-auto p-4">
      <section className="flex flex-col md:flex-row gap-6">
        <article className="flex-1">
          {operation && <OperationDetails operation={operation} />}
        </article>
        <article className="flex-1">
          {operation && <OperationPersonnelDetail operation={operation} refetchOperation={refetchOperation} />}
        </article>
      </section>
    </section>
  );
}
