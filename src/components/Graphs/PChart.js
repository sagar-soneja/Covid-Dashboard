import React from "react";
import { Pie, PieChart, Tooltip } from "recharts";

const PChart = ({ structuredWorldCurratedData }) => {
  return (
    <div>
      <PieChart width={450} height={300}>
        <Pie
          dataKey="value"
          data={structuredWorldCurratedData}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PChart;
