import { useState, useEffect, useRef } from "react";

export default function MarketCard({ market, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    // Canvas chart visualization for project activity or budget trend (optional)
    if (chartRef.current && market.data?.length) {
      const canvas = chartRef.current;
      const ctx = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.strokeStyle = market.trend === "up" ? "#10b981" : "#ef4444";
      ctx.lineWidth = 2;

      const dataPoints = market.data;
      const maxValue = Math.max(...dataPoints.map((d) => d.value));
      const minValue = Math.min(...dataPoints.map((d) => d.value));
      const range = maxValue - minValue || 1;

      dataPoints.forEach((point, i) => {
        const x = (i / (dataPoints.length - 1)) * width;
        const y = height - ((point.value - minValue) / range) * (height * 0.8);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });

      ctx.stroke();
    }
  }, [market, index]);

  return (
    <div
      className={` backdrop-blur-md border border-gray-800 rounded-2xl p-8 h-full 
                     hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-500/10 
                     transition-all duration-500 ease-in-out bg-gray-900/50   overflow-hidden ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-4 ">
          <h3 className="text-xl w-[70%] font-bold ">{market.title}</h3>
          <div
            className={
              market.trend === "up"
                ? "bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs  font-medium"
                : "bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs font-medium"
            }
          >
            {market.trend === "up" ? "High Demand" : "Low Demand"}
          </div>
        </div>

        <div className="flex justify-between mb-6">
          <div>
            <p className="text-gray-500 text-sm">Budget</p>
            <p className="text-2xl font-bold">₹{market.budget}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Proposals</p>
            <p className="text-2xl font-bold">{market.proposals || 0}</p>
          </div>
        </div>

        <div className="h-32 w-full">
          <canvas ref={chartRef} width="300" height="120" className="w-full h-full"></canvas>
        </div>

        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md">
          View Project
        </button>
      </div>
    </div>
  );
}
