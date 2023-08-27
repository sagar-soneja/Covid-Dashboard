import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  
} from "recharts";
import { filterDataByMonth } from "../../util";

const LChart = ({ structuredWorldMonthlyData, month, key1, key2, key3 }) => {
  const monthlyData = filterDataByMonth(month, structuredWorldMonthlyData);
  return (
    <div>
      <LineChart width={450} height={300} data={monthlyData}>
        <Line
          type="monotone"
          dataKey={`${key1}`}
          stroke="#2196F3"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey={`${key2}`}
          stroke="#F44236"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey={`${key3}`}
          stroke="#FFCA29"
          strokeWidth={2}
        />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
};

export default LChart;
