import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { MilitaryFilters } from "./MilitaryFilters";
import { MilitaryHeader } from "./MilitaryHeader";
import { MilitaryTable } from "./MilitaryTable";
import { useMilitary } from "@/hooks/military/querys/useMilitary";

export function MilitaryListComponent({ breadcrumb, initialStatusFilter, columns, modalComponent }: MilitaryListViewProps) {
    useBreadcrumb(breadcrumb);

    const {
        data, isLoading, refetch, searchValue,
        setSearchValue, statusFilter, setStatusFilter,
        pageIndex, setPageIndex, pageSize, setPageSize,
        orderByLastNameAsc, setOrderByLastNameAsc,
        rankFilter, setRankFilter, rankOptions 
    } = useMilitary({ initialStatusFilter });

    const statusOptions = [
        { value: '0', label: 'Desactivado' },
        { value: '1', label: 'Habilitado' }
    ].map(option => ({
        ...option,
        isSelected: option.value === statusFilter
    }));

    return (
        <>
            <MilitaryHeader />
            <MilitaryFilters
                searchValue={searchValue} setSearchValue={setSearchValue}
                statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                statusOptions={statusOptions}
                orderByLastNameAsc={orderByLastNameAsc} setOrderByLastNameAsc={setOrderByLastNameAsc}
                rankFilter={rankFilter} setRankFilter={setRankFilter}
                rankOptions={rankOptions || []}
            />

            <MilitaryTable
              isLoading={isLoading}
              data={data}
              columns={columns}
              pageIndex={pageIndex}
              pageSize={pageSize}
              setPageIndex={setPageIndex}
              setPageSize={setPageSize}
              refetch={refetch}
              hasFilters={!!rankFilter || !!searchValue || !!statusFilter}
            />
            {modalComponent}
        </>
    );
}
