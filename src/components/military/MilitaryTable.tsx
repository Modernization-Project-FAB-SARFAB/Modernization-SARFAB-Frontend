import Loader from "../common/Loader";
import SortableTable from "../common/SortableTable/SortableTable";
import { NoMilitaryMessage } from "./NoMilitaryMessage";

export function MilitaryTable({
  isLoading,
  data,
  columns,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  refetch,
  hasFilters,
}: MilitaryTableProps & { hasFilters: boolean }) {
  
  if (isLoading) return <Loader />;
  if (!data?.data.length) return <NoMilitaryMessage hasFilters={hasFilters} />;

  return (
    <SortableTable
      columns={columns}
      data={data.data}
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
