"use client";

import React, { useRef, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { ChartBar } from "lucide-react";

// Initialize Highcharts modules

import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from 'highcharts/highcharts-more';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsTreemap from 'highcharts/modules/treemap';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph';
import HighchartsSankey from 'highcharts/modules/sankey';
import Cylinder from 'highcharts/modules/cylinder';
import HighchartsStock from 'highcharts/modules/stock';
import HighchartsStreamgraph from 'highcharts/modules/streamgraph';

if (typeof window !== 'undefined') {
  HighchartsMore(Highcharts);
  Highcharts3D(Highcharts);
  HighchartsTreemap(Highcharts);
  Cylinder(Highcharts);
  HighchartsStock(Highcharts);
  HighchartsHeatmap(Highcharts);
  HighchartsNetworkgraph(Highcharts);
  HighchartsSankey(Highcharts);
  HighchartsStreamgraph(Highcharts);
}

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
  const { language, direction } = useLanguage();
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  // Format data for Highcharts
  const seriesData = data.map(item => item[dataKey]);
  const categories = data.map(item => item.name);

  const options: Highcharts.Options = {
    chart: {
      type: "column",
      options3d: {
        enabled: true,
        alpha: 20,
        beta: 20,
        depth: 80,
        viewDistance: 13
      },
      style: {
        fontFamily: "inherit"
      },
      height: "100%",
      inverted: direction === "rtl"
    },
    title: {
      text: undefined
    },
    xAxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "12px"
        }
      },
      reversed: direction === "rtl"
    },
    yAxis: {
      title: {
        text: null
      },
      labels: {
        style: {
          fontSize: "12px"
        }
      }
    },
    tooltip: {
      formatter: function() {
        return `<b>${this.x}</b><br/>${this.y}${language === "en" ? "%" : "%"}`;
      },
      style: {
        fontSize: "12px"
      },
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderWidth: 0,
      borderRadius: 8,
      shadow: true
    },
    plotOptions: {
      column: {
        depth: 25,
        colorByPoint: false,
        color: color,
        borderRadius: 4,
        borderWidth: 0,
        states: {
          hover: {
            brightness: 0.1
          }
        }
      }
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      type: "column",
      name: title,
      data: seriesData
    }]
  };

  // Update chart on language or direction change
  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.update({
        chart: {
          inverted: direction === "rtl"
        },
        xAxis: {
          reversed: direction === "rtl"
        },
        tooltip: {
          formatter: function() {
            return `<b>${this.x}</b><br/>${this.y}${language === "en" ? "%" : "%"}`;
          }
        }
      });
    }
  }, [language, direction]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-loginhr-50 p-2 rounded-lg">
          <ChartBar className="h-5 w-5 text-loginhr-600" />
        </div>
        <h3 className="font-bold text-lg text-loginhr-900">{title}</h3>
      </div>
      
      <div className="flex-1">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartRef}
          containerProps={{ style: { height: "100%", minHeight: "200px" } }}
        />
      </div>
    </div>
  );
};

export default HRBarChart;
