import { ColumnDef } from "@tanstack/react-table";

export type SortableTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
}