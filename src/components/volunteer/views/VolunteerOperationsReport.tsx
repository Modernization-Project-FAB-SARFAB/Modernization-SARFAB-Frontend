import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { VolunteerHeader } from "../headers/VolunteerHeader";
import { VolunteerTable } from "../table/VolunteerTable";
import { useParams } from "react-router-dom";
import { VolunteerOperationsReportFilters } from "../filters/VolunteerOperationsReportFilters";
import { useVolunteerOperationsReport } from "@/hooks/volunteer/querys/useVolunteerOperationsReport";
import { useGetOperationCategories } from "@/hooks/configuration/querys/useGetOperationCategories";
import { FilterOption } from "@/components/common/FilterDatalist/FilterDatalist.type";

export default function VolunteerOperationsReport({ breadcrumb, columns }: VolunteerListViewProps) {
    useBreadcrumb(breadcrumb);
    const { volunteerId } = useParams();

    const {
        data,
        isLoading,
        refetch,
        searchValue,
        setSearchValue,

        categoryFilter,
        setCateforyFilter,

        setStartDate,
        setEndDate,

        orderByDateAsc,
        setOrderByDateAsc,

        pageIndex,
        setPageIndex,
        pageSize,
        setPageSize
    } = useVolunteerOperationsReport({ initialVolunteerId: Number(volunteerId) });

    const { data: categories = [], isLoading: isLoadingCategories } = useGetOperationCategories();
    const categoryOptions = [
        { value: "", label: "Todas las categorías", isSelected: true },
        ...categories.map(category => ({
            value: String(category.operationCategoryId),
            label: category.name,
            isSelected: false
        }))
    ];
    
    
    return (
        <>
            <VolunteerHeader />
            <VolunteerOperationsReportFilters
                searchValue={searchValue} setSearchValue={setSearchValue}
                categoryFilter={categoryFilter} setCategoryFilter={setCateforyFilter} categoryOptions={categoryOptions}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                orderByDateAsc={orderByDateAsc}
                setOrderByDateAsc={setOrderByDateAsc}
                refetch={refetch}
            />
            <VolunteerTable
                isLoading={isLoading} data={data} columns={columns}
                pageIndex={pageIndex} pageSize={pageSize}
                setPageIndex={setPageIndex} setPageSize={setPageSize} refetch={refetch}
            />
        </>
    )
}