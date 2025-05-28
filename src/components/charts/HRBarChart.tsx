
import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { useLanguage } from "../../contexts/LanguageContext";
import { ChartBar } from "lucide-react";

interface HRBarChartProps {
  data: Array<{
    name: string;
    value: number;
    [key: string]: any;
  }>;
  dataKey: string;
  title: string;
  color?: string;
}

const HRBarChart: React.FC<HRBarChartProps> = ({ 
  data, 
  dataKey, 
  title,
  color = "#6366f1"
}) => {
  const { direction } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-loginhr-50 p-2 rounded-lg">
          <ChartBar className="h-5 w-5 text-loginhr-600" />
        </div>
        <h3 className="font-bold text-lg text-loginhr-900">{title}</h3>
      </div>
      
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
          <BarChart
            data={data}
            layout={direction === "rtl" ? "vertical" : "horizontal"}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            {direction === "rtl" ? (
              <>
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
              </>
            ) : (
              <>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis type="number" />
              </>
            )}
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              contentStyle={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            />
            <Legend />
            <Bar 
              dataKey={dataKey} 
              fill={color} 
              radius={[4, 4, 0, 0]} 
              animationDuration={1500}
              animationEasing="ease-out"
              className="hover:opacity-80 transition-opacity"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HRBarChart;
