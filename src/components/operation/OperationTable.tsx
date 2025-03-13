import Loader from "../common/Loader";
import SortableTable from "../common/SortableTable/SortableTable";
import { NoOperationMessage } from "./NoOperationMessage";
import { OperationTableProps } from "./types/OperationTableProps";

export function OperationTable(props: OperationTableProps) {
  const { isLoading, data, columns, pageIndex, pageSize, setPageIndex, setPageSize, refetch } = props;
  if (isLoading) return <Loader />;
  if (!data?.data.length) return <NoOperationMessage />;

  const formattedData = data.data.map((row) => ({
    ...row,
    departureDate: row.departureDate ? new Date(row.departureDate) : undefined,
    arrivalDate: row.arrivalDate ? new Date(row.arrivalDate) : undefined,
  }));   
  
  return (
    <SortableTable
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      columns={columns} data={formattedData as any}
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