import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { VolunteerHeader } from "../headers/VolunteerHeader";
import { useGrades } from "@/hooks/grades/querys/useGrades";
import { useVolunteerActive } from "@/hooks/volunteer/querys/useVolunteerActive";
import { VolunteerActiveFilters } from "../filters/VolunteerActiveFilters";
import { VolunteerTable } from "../table/VolunteerTable";

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
                        isSelected: false,
                        key: grade.id.toString()
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
            {modalComponent}
        </>
    )
}