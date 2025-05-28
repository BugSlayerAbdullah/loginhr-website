
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";
import { useLanguage } from "../../contexts/LanguageContext";
import { ChartLine } from "lucide-react";

interface HRLineChartProps {
  data: Array<any>;
  lines: Array<{
    dataKey: string;
    color: string;
    name?: string;
  }>;
  title: string;
}

const HRLineChart: React.FC<HRLineChartProps> = ({ data, lines, title }) => {
  const { language, direction } = useLanguage();
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-loginhr-50 p-2 rounded-lg">
          <ChartLine className="h-5 w-5 text-loginhr-600" />
        </div>
        <h3 className="font-bold text-lg text-loginhr-900">{title}</h3>
      </div>
      
      <div className="flex-1 mt-2">
        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              reversed={direction === "rtl"}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: number) => [
                `${value}${language === "en" ? "" : " "}${language === "en" ? "%" : "%"}`,
                ""
              ]}
              contentStyle={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Legend 
              iconType="circle" 
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs font-medium">{value}</span>
              )}
            />
            {lines.map((line, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name || line.dataKey}
                stroke={line.color}
                activeDot={{ r: 6, strokeWidth: 1, stroke: "#fff" }}
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                animationDuration={1500 + index * 300}
                animationEasing="ease-out"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HRLineChart;
