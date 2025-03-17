
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

interface NetWorthChartProps {
  data: Array<{
    month: string;
    value: number;
    percentChange: number;
  }>;
  forecast?: boolean;
}

const NetWorthChart: React.FC<NetWorthChartProps> = ({ data, forecast = false }) => {
  const chartData = forecast 
    ? [...data, { month: 'Sep', value: 22800, percentChange: 6.0 }] 
    : data;

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-gradient-start, #42FF9F)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="var(--chart-gradient-end, #42FF9F)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip 
            formatter={(value) => [
              value.toLocaleString('de-DE', { 
                style: 'currency', 
                currency: 'EUR' 
              }), 
              "Nettovermögen"
            ]}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="var(--chart-line, #42FF9F)" 
            fillOpacity={1} 
            fill="url(#colorValue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetWorthChart;
