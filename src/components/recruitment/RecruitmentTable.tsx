import Loader from "../common/Loader";
import SortableTable from "../common/SortableTable/SortableTable";
import { NoRecruitsMessage } from "./NoRecruitsMessage";



export function RecruitmentTable({ isLoading, data, columns, pageIndex, pageSize, setPageIndex, setPageSize, refetch }: RecruitmentTableProps) {
    if (isLoading) return <Loader />;
    if (!data?.data.length) return <NoRecruitsMessage />;

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
