
export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface MultiSeriesDataPoint {
  name: string;
  [key: string]: any;
}

export interface ChartSeries {
  dataKey: string;
  color: string;
  name?: string;
}
