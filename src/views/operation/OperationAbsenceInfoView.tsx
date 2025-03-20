import OperationAbsenceInfo from "@/components/operation/OperationAbsenceInfo"
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb"
import { useGetOperationAbsence } from "@/hooks/operation/querys/useGetOperationAbsence"
import { useParams } from "react-router-dom"

export default function OperationAbsenceInfoView() {
  useBreadcrumb([
    { label: 'Operaciones', path: '/operation/list' },
    { label: 'Marcar inasistencia' },])
  
  const { operationId } = useParams<{ operationId: string }>()
  const operationIdNumber = Number(operationId)

  const { data: operation, isLoading: isLoadingOperation } = useGetOperationAbsence(operationIdNumber);
  
  return isLoadingOperation ? (
    <p className="text-center text-gray-500">Cargando datos...</p>
  ) : (
    <div className="container mx-auto p-4">
        <OperationAbsenceInfo
          data={operation!}
          operationId={operationIdNumber}
        />
  </div>
  );
}