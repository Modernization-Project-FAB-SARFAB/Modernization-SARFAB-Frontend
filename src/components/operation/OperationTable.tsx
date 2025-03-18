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
    departureDate: row.departureDate || '-',
    arrivalDate: row.arrivalDate || '-',
  }));   
  
  return (
    <SortableTable
      columns={columns} data={formattedData}
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