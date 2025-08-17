const DataTable = ({ title, data, columns }) => {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <h3 className="text-xl font-semibold text-violet-400 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              {columns.map((column, index) => (
                <th key={index} className="text-left py-3 px-4 text-slate-400 font-medium">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border-slate-700 hover:bg-slate-700 transition-colors">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="py-3 px-4 text-white">
                    {column.accessor(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
