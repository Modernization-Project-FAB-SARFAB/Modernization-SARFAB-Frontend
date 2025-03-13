import { ActiveOperation } from "@/types/operation.schema";
import { ActionsColumn } from "./ActionsColumn";
import { OperationColumns } from "./OperationColumns";
import { ColumnDef } from "@tanstack/react-table";

export const OperationColumnsDef: ColumnDef<ActiveOperation>[] = [
  ...OperationColumns,
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <ActionsColumn row={row} />,
    enableSorting: false,
  }
];
