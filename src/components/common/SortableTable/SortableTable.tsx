import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { SortableTableProps } from './SortableTableProps.type';

const SortableTable = <T,>({ columns, data }: SortableTableProps<T>) => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { sorting },
        onSortingChange: setSorting,
        initialState: {
            columnVisibility: {
                recruitmentId: false,
            },
        },
    });

    return (
        <div className="rounded-sm border border-stroke bg-white mt-3 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto text-center">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="bg-gray-2 text-left dark:bg-meta-4">
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} colSpan={header.colSpan} className={`py-4 px-4 text-center font-bold text-black dark:text-white`}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={
                                                    header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                                                }
                                                onClick={header.column.getToggleSortingHandler()}
                                                title={
                                                    header.column.getCanSort()
                                                        ? header.column.getNextSortingOrder() === 'asc'
                                                            ? 'Sort ascending'
                                                            : header.column.getNextSortingOrder() === 'desc'
                                                                ? 'Sort descending'
                                                                : 'Clear sort'
                                                        : undefined
                                                }
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {{ asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                            <>
                                {table.getRowModel().rows.slice(0, 10).map(row => (
                                    <tr key={row.id} className="border-b border-[#eee] dark:border-strokedark">
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className={`py-5 px-4 text-black dark:text-white`}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </>
                    </tbody>
                    <tfoot>
                        {table.getRowModel().rows.length.toLocaleString()} Rows
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default SortableTable;