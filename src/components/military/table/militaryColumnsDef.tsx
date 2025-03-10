import { baseColumns } from './baseColumns';
import { ColumnDef } from '@tanstack/react-table';
import { Military } from '@/types/index';
import { ActionsColumn } from './ActionsColumn';

export const militaryColumnsDef: ColumnDef<Military>[] = [
  ...baseColumns,
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <ActionsColumn row={row} />
      </div>
    ),
    enableSorting: false,
  }  
];

