import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { VolunteerHeader } from "../headers/VolunteerHeader";
import { VolunteerTable } from "../table/VolunteerTable";
import { useParams } from "react-router-dom";
import { VolunteerOperationsReportFilters } from "../filters/VolunteerOperationsReportFilters";
import { useVolunteerOperationsReport } from "@/hooks/volunteer/querys/useVolunteerOperationsReport";

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

    return (
        <>
            <VolunteerHeader />
            <VolunteerOperationsReportFilters
                searchValue={searchValue} setSearchValue={setSearchValue}
                categoryFilter={categoryFilter} setCategoryFilter={setCateforyFilter} categoryOptions={[]}
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