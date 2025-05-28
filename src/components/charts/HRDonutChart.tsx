
import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useLanguage } from "../../contexts/LanguageContext";
import { Activity } from "lucide-react";

interface DonutChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  title: string;
}

const HRDonutChart: React.FC<DonutChartProps> = ({ data, title }) => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-loginhr-50 p-2 rounded-lg">
          <Activity className="h-5 w-5 text-loginhr-600" />
        </div>
        <h3 className="font-bold text-lg text-loginhr-900">{title}</h3>
      </div>
      
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  opacity={activeIndex === undefined || activeIndex === index ? 1 : 0.7}
                  stroke="white"
                  strokeWidth={activeIndex === index ? 2 : 1} 
                  className="transition-all duration-200"
                  style={{
                    filter: activeIndex === index ? "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.2))" : "none",
                    transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.2s, filter 0.2s, opacity 0.2s"
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => language === "en" ? `${value}%` : `%${value}`}
              contentStyle={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none",
                padding: "8px 12px"
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle" 
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs font-medium text-gray-600">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HRDonutChart;
