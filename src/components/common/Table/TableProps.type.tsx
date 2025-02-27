type TableProps<T> = {
    columns: Column<T>[];
    data: T[];
    renderActions?: (row: T) => JSX.Element;
};