import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useVolunteerCompletedCourses } from "@/hooks/courseVolunteer/querys/useVolunteerCompletedCourses";
import { VolunteerTable } from "../table/VolunteerTable";
import { useParams } from "react-router-dom";

export default function VolunteerCompletedCourses({ breadcrumb, columns, modalComponent }: VolunteerListViewProps) {
    useBreadcrumb(breadcrumb);
    const { volunteerId } = useParams();

    const {
        data,
        isLoading,
        isError,
        refetch,
        pageIndex,
        setPageIndex,
        pageSize,
        setPageSize,
    } = useVolunteerCompletedCourses({initialVolunteerId:volunteerId});
    return <>
        <VolunteerTable
            isLoading={isLoading} data={data} columns={columns}
            pageIndex={pageIndex} pageSize={pageSize}
            setPageIndex={setPageIndex} setPageSize={setPageSize} refetch={refetch}
        />
    </>
}