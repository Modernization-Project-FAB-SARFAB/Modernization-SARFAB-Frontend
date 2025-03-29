import Loader from "../common/Loader";
import SortableTable from "../common/SortableTable/SortableTable";
import { NoMovementHistoryMessage } from "./NoMovementHistoryMessage";
import { MovementHistoricalTableProps } from "./types/MovementHistoricalTableProps";

export function MovementHistoricalTable(props: MovementHistoricalTableProps) {
  const { isLoading, data, columns, pageIndex, pageSize, setPageIndex, setPageSize, refetch } = props;

  if (isLoading) return <Loader />;
  if (!data?.data.length) return <NoMovementHistoryMessage />;

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
