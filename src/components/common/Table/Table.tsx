const Table = <T,>({ columns, data, renderActions }: TableProps<T>) => {
    return (
      <div className="rounded-sm border border-stroke bg-white mt-3 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto text-center">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                {columns.map((col, index) => (
                  <th key={index} className={`py-4 px-4 text-center font-bold text-black dark:text-white ${index === 0 ? 'hidden' : ''}`}>
                    {col.header}
                  </th>
                ))}
                {renderActions && <th className="py-4 px-4 font-bold text-black dark:text-white">Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-[#eee] dark:border-strokedark">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={`py-5 px-4 text-black dark:text-white ${colIndex === 0 ? 'hidden' : ''}`}>
                      {col.render ? col.render(row[col.accessor], row) : (row[col.accessor] as React.ReactNode)}
                    </td>
                  ))}
                  {renderActions && (
                    <td className="py-5">
                      {renderActions(row)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default Table;