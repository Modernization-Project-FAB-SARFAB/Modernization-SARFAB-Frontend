import Loader from "../common/Loader";
import SortableTable from "../common/SortableTable/SortableTable";
import { NoMilitaryPersonnelMessage } from "./NoMilitaryPersonnelMessage";

export function MilitaryPersonnelTable({
  isLoading,
  data,
  columns,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  refetch
}: MilitaryPersonnelTableProps) {
  if (isLoading) return <Loader />;
  if (!data?.data.length) return <NoMilitaryPersonnelMessage />;

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
