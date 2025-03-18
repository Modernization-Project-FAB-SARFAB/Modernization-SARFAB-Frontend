import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { VolunteerActiveFilters } from "./VolunteerActiveFilters";
import { VolunteerHeader } from "./VolunteerHeader";
import { VolunteerTable } from "./VolunteerTable";
import { useGrades } from "@/hooks/grades/querys/useGrades";
import { useVolunteerActive } from "@/hooks/volunteer/querys/useVolunteerActive";

export default function VolunteerActiveListView({ breadcrumb, columns, modalComponent }: VolunteerListViewProps) {
    useBreadcrumb(breadcrumb);
    const { data: grades, isLoading: isLoadingGrades, isError } = useGrades();

    const {
        data, isLoading, refetch, searchValue,
        setSearchValue, gradeIdFilter, setgradeIdFilter,
        pageIndex, setPageIndex, pageSize, setPageSize,
        orderByLastNameAsc,
        setOrderByLastNameAsc,
    } = useVolunteerActive();

    return (
        <>
            <VolunteerHeader />
            <VolunteerActiveFilters
                searchValue={searchValue} setSearchValue={setSearchValue}
                gradeIdFilter={gradeIdFilter} setgradeIdFilter={setgradeIdFilter}
                gradeIdOptions={[
                    { value: "", label: "Todos los grados", isSelected: gradeIdFilter === "" },
                    ...(grades?.map(grade => ({
                        value: grade.id.toString(),
                        label: grade.name,
                        isSelected: false
                    })) || [])
                ]}
                orderByLastNameAsc={orderByLastNameAsc}
                setOrderByLastNameAsc={setOrderByLastNameAsc}
            />
            <VolunteerTable
                isLoading={isLoading} data={data} columns={columns}
                pageIndex={pageIndex} pageSize={pageSize}
                setPageIndex={setPageIndex} setPageSize={setPageSize} refetch={refetch}
            />
        </>
    )
}