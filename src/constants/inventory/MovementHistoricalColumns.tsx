import { MovementHistory } from "@/types/invetory.schema";
import { ColumnDef } from "@tanstack/react-table";
import { convertToLocalDate } from "@/utils/common/formatDate";

export const MovementHistoricalColumns: ColumnDef<MovementHistory>[] = [
  {
    header: "Nombre del voluntario",
    accessorKey: "volunteerName",
  },
  {
    header: "Nombre del elemento",
    accessorKey: "itemName",
  },
  {
    header: "Fecha del movimiento",
    accessorKey: "movementDate",
    cell: ({ getValue }) => convertToLocalDate(getValue<string>()),
  },
  {
    header: "Tipo de acción",
    accessorKey: "action",
  },
  {
    header: "Cantidad",
    accessorKey: "quantity",
  }
];