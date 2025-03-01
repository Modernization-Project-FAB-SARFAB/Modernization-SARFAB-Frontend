import { ColumnDef } from "@tanstack/react-table";

export interface SortableTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
}