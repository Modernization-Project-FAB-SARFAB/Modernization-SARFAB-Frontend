import Loader from "../common/Loader";
import SortableTable from "../common/SortableTable/SortableTable";
import { NoOperationMessage } from "./NoOperationMessage";
import { OperationTableProps } from "./types/OperationTableProps";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function OperationTable(props: OperationTableProps) {
  const { isLoading, data, columns, pageIndex, pageSize, setPageIndex, setPageSize, refetch } = props;
  if (isLoading) return <Loader />;
  if (!data?.data.length) return <NoOperationMessage />;

  const formattedData = data.data.map((row) => ({
    ...row,
    departureDate: row.departureDate ? format(new Date(row.departureDate), "dd/MM/yyyy", { locale: es }) : "-",
    arrivalDate: row.arrivalDate ? format(new Date(row.arrivalDate), "dd/MM/yyyy", { locale: es }) : "-",
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