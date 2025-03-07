import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { RecruitmentFilters } from "./RecruitmentFilters";
import { RecruitmentHeader } from "./RecruitmentHeader";
import { RecruitmentTable } from "./RecruitmentTable";
import { useRecruitment } from "@/hooks/recruitment";

export function RecruitmentListView({ breadcrumb, initialStatusFilter, columns, modalComponent }: RecruitmentListViewProps) {
    useBreadcrumb(breadcrumb);

    const {
        data, isLoading, refetch, searchValue,
        setSearchValue, statusFilter, setStatusFilter,
        pageIndex, setPageIndex, pageSize, setPageSize
    } = useRecruitment({ initialStatusFilter });

    const statusOptions = [
        { value: '0', label: 'Rechazado' },
        { value: '1', label: 'Pendiente de aprobación' },
        { value: '2', label: 'Apto - Pendiente de registro de voluntario' },
        { value: '3', label: 'Apto - Registrado como voluntario' }
    ].map(option => ({ ...option, isSelected: option.value === initialStatusFilter }));

    return (
        <>
            <RecruitmentHeader />
            <RecruitmentFilters
                searchValue={searchValue} setSearchValue={setSearchValue}
                statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                statusOptions={statusOptions}
            />
            <RecruitmentTable
                isLoading={isLoading} data={data} columns={columns}
                pageIndex={pageIndex} pageSize={pageSize}
                setPageIndex={setPageIndex} setPageSize={setPageSize} refetch={refetch}
            />
            {modalComponent}
        </>
    );
}