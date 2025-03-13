import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import type { OperationListComponentProps } from "@/components/operation/types/OperationListComponentProps";
import { useOperation } from '@/hooks/operation/querys/useOperation';
import { OperationHeader } from "./OperationHeader";
import { OperationTable } from "./OperationTable";
import { OperationFilter } from "./OperationFilters";
import { useOperationContext } from "@/hooks/operation/querys/useOperationContext";
export function OperationListComponent(props: OperationListComponentProps) {
  const { breadcrumb, initialStatusFilter, columns, modalComponent } = props;
  useBreadcrumb(breadcrumb);
  const statusFilterNumber = Number(initialStatusFilter);
  const {
    data, isLoading, refetch, searchValue,
    setSearchValue, statusFilter, setStatusFilter, municipalityFilter, setMunicipalityFilter, categoryFilter, setCategoryFilter, startDateFilter, setStartDateFilter, endDateFilter, setEndDateFilter, pageIndex, setPageIndex, pageSize, setPageSize
  } = useOperation({ status: statusFilterNumber });

  const { data: operationContext } = useOperationContext();

  const municipalityOptions = [
    { id: 0, name: 'Todos' },
    ...operationContext?.municipalities.map(m => ({
      id: m.municipalityId,
      name: m.name
    })) || []
  ];
  
  const categoryOptions = [
    { id: 0, name: 'Todos' },
    ...operationContext?.operationCategories.map(c => ({
      id: c.operationCategoryId,
      name: c.name
    })) || []
  ];
  
  const statusOptions = [
    { id: 1, name: 'Activa' },
    { id: 0, name: 'Finalizada' },
  ].map(option => ({ ...option, isSelected: option.id === statusFilterNumber }));

  return (
    <>
      <OperationHeader />
      <OperationFilter
        searchValue={searchValue} setSearchValue={setSearchValue}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        statusOptions={statusOptions}
        municipalityFilter={municipalityFilter} setMunicipalityFilter={setMunicipalityFilter}
        municipalityOptions={municipalityOptions}
        categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
        categoryOptions={categoryOptions}
        startDateFilter={startDateFilter} setStartDateFilter={setStartDateFilter}
        endDateFilter={endDateFilter} setEndDateFilter={setEndDateFilter}/>
      <OperationTable
        isLoading={isLoading} data={data} columns={columns}
        pageIndex={pageIndex} pageSize={pageSize}
        setPageIndex={setPageIndex} setPageSize={setPageSize} refetch={refetch}
      />
      {modalComponent}
    </>
  );
}