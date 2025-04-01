import SortableTable from "@/components/common/SortableTable/SortableTable";
import { RequesterType } from "@/types/requester.schema";
import Loader from "@/components/common/Loader";

interface RequesterTableProps {
  data: { data: RequesterType[]; totalPages: number } | undefined;
  columns: any;
  pageIndex: number;
  pageSize: number;
  setPageIndex: (page: number) => void;
  setPageSize: (size: number) => void;
  refetch: () => void;
  isLoading?: boolean;
}

export function RequesterTable({
  data,
  columns,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  refetch,
  isLoading = false
}: RequesterTableProps) {
  const requesters = data?.data || [];
  const totalPages = data?.totalPages || 0;

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto">
      <SortableTable
        columns={columns}
        data={requesters}
        pagination={{ pageIndex, pageSize }}
        totalPages={totalPages}
        onPaginationChange={({ pageIndex, pageSize }) => {
          setPageIndex(pageIndex);
          setPageSize(pageSize);
          refetch();
        }}
      />
    </div>
  );
}
