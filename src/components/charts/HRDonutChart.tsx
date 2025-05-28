"use client";

import React, { useRef, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Activity } from "lucide-react";
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
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  // Format data for Highcharts
  const seriesData = data.map(item => ({
    name: item.name,
    y: item.value,
    color: item.color
  }));

  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 60,
        beta: 0
      },
      style: {
        fontFamily: "inherit"
      },
      height: "100%"
    },
    title: {
      text: undefined
    },
    plotOptions: {
      pie: {
        innerSize: "30%",
        depth: 70,
        dataLabels: {
          enabled: false
        },
        showInLegend: true,
        states: {
          hover: {
            brightness: 0.1
          }
        },
        borderWidth: 0
      }
    },
    tooltip: {
      pointFormat: `<b>{point.percentage:.1f}${language === "en" ? "%" : "%"}</b>`,
      style: {
        fontSize: "12px"
      },
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderWidth: 0,
      borderRadius: 8,
      shadow: true
    },
    legend: {
      enabled: true,
      itemStyle: {
        fontSize: "12px",
        fontWeight: "normal",
        color: "#666"
      },
      symbolRadius: 4
    },
    credits: {
      enabled: false
    },
    series: [{
      type: "pie",
      name: title,
      data: seriesData
    }]
  };

  // Update chart on language change
  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.update({
        tooltip: {
          pointFormat: `<b>{point.percentage:.1f}${language === "en" ? "%" : "%"}</b>`
        }
      });
    }
  }, [language]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-loginhr-50 p-2 rounded-lg">
          <Activity className="h-5 w-5 text-loginhr-600" />
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

export default HRDonutChart;
