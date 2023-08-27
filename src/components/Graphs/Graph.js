import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  structureData,
  strucuteCurratedData,
} from "../../util";
import PChart from "./PChart";
import BChart from "./BChart";
import LChart from "./LChart";
import "./Graph.css";

import Checkbox from "../Checkbox/Checkbox";

const Graph = () => {
  const state = useSelector((state) => state);
  const { worldMonthlyData, worldCurratedData } = state;

  const [checkboxData, setCheckboxData] = useState([
    { title: "1 Month", value: 1, state: true },
    { title: "3 Month", value: 3, state: false },
    { title: "6 Month", value: 6, state: false },
  ]);
  const [month, setMonth] = useState(1);
  var structuredWorldMonthlyData = structureData(worldMonthlyData);

  var structuredWorldCurratedData = strucuteCurratedData(worldCurratedData);

  const handleCheckboxChange = (title) => {
    const updatedCheckboxData = [...checkboxData];

    for (const item of updatedCheckboxData) {
      if (item.title === title) {
        item.state = !item.state;
        setMonth(item.value);
      } else {
        item.state = false;
      }
    }

    setCheckboxData(updatedCheckboxData);
  };

  useEffect(() => {}, [month]);

  return (
    <div>
      <div className="container">
        <div className="checkbox">
          <p>Filter :- Global</p>
          {checkboxData.map((checkbox, index) => {
            return (
              <Checkbox
                key={index}
                title={checkbox.title}
                onChange={() => handleCheckboxChange(checkbox.title)}
                // onclick={}
                state={checkbox.state}
              />
            );
          })}
        </div>

        <div className="upper-charts">
          <div className="chart">
            <BChart
              structuredWorldMonthlyData={structuredWorldMonthlyData}
              month={month}
              key1={"cases"}
              key2={"deaths"}
              key3={"recovered"}
            />
          </div>
          <div className="chart">
            <LChart
              structuredWorldMonthlyData={structuredWorldMonthlyData}
              month={month}
              key1={"cases"}
              key2={"deaths"}
              key3={"recovered"}
            />
          </div>
        </div>
        <div className="pie-chart">
          <PChart structuredWorldCurratedData={structuredWorldCurratedData} />
        </div>
      </div>
    </div>
  );
};

export default Graph;
