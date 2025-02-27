type Column<T> = {
    header: string;
    accessor: keyof T; // Esto garantiza que accessor sea una clave válida del objeto
    render?: (value: any, row: T) => JSX.Element; // Render opcional, adaptable a cualquier tipo
  };
  