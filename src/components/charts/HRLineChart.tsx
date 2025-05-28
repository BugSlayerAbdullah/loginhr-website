"use client"

import React, { useRef, useEffect } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import HighchartsStock from "highcharts/modules/stock"
import { mockdata } from '@/constants/mockdata'

if (typeof window !== "undefined") {
  HighchartsStock(Highcharts)
}

const HRLineChart: React.FC = () => {
  const detailChartRef = useRef<HighchartsReact.RefObject>(null)
  const masterChartRef = useRef<HighchartsReact.RefObject>(null)

  // Purple theme colors
  const primaryColor = "#6b46c1" // Deep purple
  const secondaryColor = "#9f7aea" // Medium purple
  const lightColor = "#e9d8fd" // Light purple
  const maskFill = "rgba(107, 70, 193, 0.1)" // Transparent purple for mask
  
  // Initialize with a subset of data for the detail chart
  const initialDetailData = mockdata.slice(0, 100)

  const createDetailOptions = (filteredData: [number, number][]) => ({
    chart: {
      height: 300,
      reflow: false,
      marginLeft: 50,
      marginRight: 20,
      style: {
        fontFamily: '"Inter", "Segoe UI", sans-serif'
      }
    },
    credits: { enabled: false },
    title: {
      text: "Daily Employee Attendance Rate",
      align: "left",
      style: {
        fontWeight: 'bold',
        color: '#2D3748'
      }
    },
    subtitle: {
      text: "Percentage of employees checked in daily (Jan-Apr 2023)",
      align: "left",
      style: {
        color: '#718096'
      }
    },
    xAxis: { 
      type: "datetime",
      labels: {
        style: {
          color: '#4A5568'
        }
      },
      lineColor: '#E2E8F0'
    },
    yAxis: {
      title: { 
        text: "Attendance Rate (%)",
        style: {
          color: '#4A5568'
        }
      },
      labels: { 
        enabled: true,
        style: {
          color: '#4A5568'
        }
      },
      gridLineColor: '#E2E8F0'
    },
    tooltip: {
      formatter: function () {
        const point = this.points?.[0]
        const percentage = ((point?.y || 0) * 100).toFixed(0)
        return `<b>Attendance Data</b><br/>${Highcharts.dateFormat('%A, %b %e, %Y', point?.x || 0)}:<br/><b>${percentage}%</b> employees checked in`
      },
      shared: true,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 1,
      borderColor: '#E2E8F0',
      shadow: true
    },
    legend: { enabled: false },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
          states: { hover: { enabled: true, radius: 3 } }
        }
      }
    },
    series: [
      {
        name: "Employee Attendance",
        type: "line",
        data: filteredData,
        color: primaryColor,
        lineWidth: 2
      }
    ]
  })

  const masterOptions: Highcharts.Options = {
    chart: {
      height: 100,
      reflow: false,
      borderWidth: 0,
      backgroundColor: null,
      marginLeft: 50,
      marginRight: 20,
      marginTop: 20,
      zooming: { type: "x" },
      events: {
        selection: function (event) {
          const extremes = event.xAxis[0]
          const min = extremes.min
          const max = extremes.max
          const filtered = mockdata.filter(p => p[0] >= min && p[0] <= max)

          // update detail chart
          if (detailChartRef.current) {
            detailChartRef.current.chart.series[0].setData(filtered)
          }

          // update plot bands
          const xAxis = this.xAxis[0]
          xAxis.removePlotBand("mask-before")
          xAxis.addPlotBand({
            id: "mask-before",
            from: mockdata[0][0],
            to: min,
            color: maskFill
          })

          xAxis.removePlotBand("mask-after")
          xAxis.addPlotBand({
            id: "mask-after",
            from: max,
            to: mockdata[mockdata.length - 1][0],
            color: maskFill
          })

          return false
        }
      }
    },
    title: { text: null },
    xAxis: {
      type: "datetime",
      plotBands: [
        {
          id: "mask-before",
          from: mockdata[0][0],
          to: mockdata[mockdata.length - 1][0],
          color: maskFill
        }
      ],
      title: { text: null },
      lineColor: '#E2E8F0',
      labels: {
        style: {
          color: '#718096',
          fontSize: '10px'
        }
      }
    },
    yAxis: {
      gridLineWidth: 0,
      labels: { enabled: false },
      title: { text: null },
      min: 0,
      showFirstLabel: false
    },
    legend: { enabled: false },
    credits: { enabled: false },
    plotOptions: {
      series: {
        lineWidth: 1,
        marker: { enabled: false },
        shadow: false,
        states: { hover: { lineWidth: 1 } },
        enableMouseTracking: false
      }
    },
    series: [
      {
        type: "area",
        name: "Employee Attendance",
        data: mockdata.map(p => p),
        color: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, primaryColor],
            [1, Highcharts.color(lightColor).setOpacity(0.5).get('rgba') as string]
          ]
        },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, Highcharts.color(secondaryColor).setOpacity(0.4).get('rgba') as string],
            [1, Highcharts.color(lightColor).setOpacity(0.1).get('rgba') as string]
          ]
        },
        lineWidth: 1
      }
    ]
  }

  // Set initial selection on master chart
  useEffect(() => {
    if (masterChartRef.current && masterChartRef.current.chart) {
      const chart = masterChartRef.current.chart;
      const xAxis = chart.xAxis[0];
      
      // Set initial selection to first 100 data points
      const min = mockdata[0][0];
      const max = mockdata[99][0];
      
      // Update plot bands to show selection
      xAxis.removePlotBand("mask-before");
      xAxis.addPlotBand({
        id: "mask-before",
        from: mockdata[0][0],
        to: min,
        color: maskFill
      });

      xAxis.removePlotBand("mask-after");
      xAxis.addPlotBand({
        id: "mask-after",
        from: max,
        to: mockdata[mockdata.length - 1][0],
        color: maskFill
      });
    }
  }, []);

  return (
    <div className="hr-chart-container" style={{ width: '100%', marginBottom: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '16px', backgroundColor: 'white' }}>
      <div style={{ marginBottom: '10px' }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={createDetailOptions(initialDetailData as any)}
          ref={detailChartRef}
        />
      </div>
      <div>
        <HighchartsReact 
          highcharts={Highcharts} 
          options={masterOptions} 
          ref={masterChartRef}
        />
      </div>
    </div>
  )
}

export default HRLineChart
