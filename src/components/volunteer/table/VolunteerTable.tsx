import Loader from "../../common/Loader";
import { MessageWithLink } from "../../common/MesaggeWithLink/MessageWithLink";
import SortableTable from "../../common/SortableTable/SortableTable";

export function VolunteerTable({ isLoading, data, columns, pageIndex, pageSize, setPageIndex, setPageSize, refetch }: RecruitmentTableProps) {
    if (isLoading) return <Loader />;
    if (!data?.data.length)
        return <MessageWithLink
            message="No existen voluntarios."
            linkText="Crear nueva afiliación"
            linkUrl="/volunteers/create"
        />;

    return (
        <SortableTable
            columns={columns} data={data.data}
            pagination={{ pageIndex, pageSize }}
            totalPages={data.totalPages}
            onPaginationChange={({ pageIndex, pageSize }) => {
                setPageIndex(pageIndex);
                setPageSize(pageSize);
                refetch();
            }}
        />
    );
}