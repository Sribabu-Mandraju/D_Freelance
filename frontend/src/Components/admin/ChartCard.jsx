const ChartCard = ({ title, children }) => {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <h3 className="text-xl font-semibold text-violet-400 mb-4">{title}</h3>
      <div className="h-64 flex items-center justify-center">
        {children || (
          <div className="text-slate-500 text-center">
            <div className="text-4xl mb-2">📊</div>
            <div>Chart visualization would go here</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChartCard
