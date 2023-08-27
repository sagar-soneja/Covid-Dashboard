import React from "react";
import {
  CartesianGrid,
  Bar,
  BarChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { filterDataByMonth } from "../../util";

const BChart = ({ structuredWorldMonthlyData, month, key1, key2, key3 }) => {
  const monthlyData = filterDataByMonth(month, structuredWorldMonthlyData);
 
  return (
    <div>
      <BarChart width={450} height={300} data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
      
        <Tooltip />
        <Legend />
        <Bar dataKey={`${key1}`} fill="#8884d8" />
        <Bar dataKey={`${key2}`} stackId="a" fill="#FFF" />
        <Bar dataKey={`${key3}`} stackId="a" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default BChart;
