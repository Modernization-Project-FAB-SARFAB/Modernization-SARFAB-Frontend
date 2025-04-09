import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { VolunteerTable } from "../table/VolunteerTable";
import { useParams } from "react-router-dom";
import { VolunteerOperationsReportFilters } from "../filters/VolunteerOperationsReportFilters";
import { useVolunteerOperationsReport } from "@/hooks/volunteer/querys/useVolunteerOperationsReport";
import { useGetOperationCategories } from "@/hooks/configuration/querys/useGetOperationCategories";
import BackLink from "@/components/common/BackLink/BackLink";

export default function VolunteerOperationsReport({ breadcrumb, columns }: VolunteerListViewProps) {
    useBreadcrumb(breadcrumb);
    const { volunteerId } = useParams();

    const {
        data,
        isLoading,
        isFetching,
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
            <div className="bg-white dark:bg-boxdark rounded-lg border border-stroke shadow-default dark:border-strokedark p-4 mb-4">
                <BackLink
                    text="Volver atrás"
                    iconSize={20}
                    link="/volunteers"
                    useRouter={true}
                />
                <VolunteerOperationsReportFilters
                    searchValue={searchValue} setSearchValue={setSearchValue}
                    categoryFilter={categoryFilter} setCategoryFilter={setCateforyFilter} categoryOptions={categoryOptions}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    orderByDateAsc={orderByDateAsc}
                    setOrderByDateAsc={setOrderByDateAsc}
                    refetch={refetch}
                />
                <VolunteerTable isFetching={isFetching}
                    isLoading={isLoading} data={data} columns={columns}
                    pageIndex={pageIndex} pageSize={pageSize}
                    setPageIndex={setPageIndex} setPageSize={setPageSize} refetch={refetch}
                    noItemsMessage="No existen registros de operativos para este voluntario" noItemsLinkText="Agregar operativo" noItemsLinkUrl="/operation/create"
                />
            </div>


        </>
    )
}