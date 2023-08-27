import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import numeral from "numeral";

import "./StateData.css";
import { stateDataStructure } from "../../util";
import LChart from "../Graphs/LChart";
import BChart from "../Graphs/BChart";
import PChart from "../Graphs/PChart";
import Checkbox from "../Checkbox/Checkbox";

const StateData = () => {
  const state = useSelector((state) => state);
  let { indiaStateData, indiaMonthlyData, indiaCurratedData } = state;

  const [indiaData, setIndiaData] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [stateCurratedData, setStateCurratedData] = useState({});
  const [month, setMonth] = useState(1);
  const [checkboxData, setCheckboxData] = useState([
    { title: "1 Month", value: 1, state: true },
    { title: "3 Month", value: 3, state: false },
    { title: "6 Month", value: 6, state: false },
  ]);

  const stateCodeData = async (t) => {
    const res = await axios.get(
      `https://data.incovid19.org/v4/min/timeseries-${t.statecode}.min.json`
    );
    const code = t.statecode;
    const updated_Data = stateDataStructure(res.data[code].dates);

    setMonthlyData(updated_Data.finalResult);
    setIndiaData(updated_Data.transformedData);
    setStateCurratedData(t);
  };

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

  useEffect(() => {}, [monthlyData, indiaData, month]);

  return (
    <>
      <div className="main-heading">
        <h1 className="text-center">
          <span>INDIA </span>COVID-19 Dashboard
        </h1>
      </div>

      {Object.keys(stateCurratedData).length !== 0 && (
        <div className="cards">
          <div className="card">
            <h1>{numeral(stateCurratedData.confirmed).format("0,0")}</h1>
            <h3>Cases</h3>
          </div>

          <div className="card">
            <h1>{numeral(stateCurratedData.recovered).format("0,0")}</h1>
            <h3>Recovered</h3>
          </div>
          <div className="card">
            <h1>{numeral(stateCurratedData.deaths).format("0,0")}</h1>
            <h3>Deaths </h3>
          </div>
        </div>
      )}

      {monthlyData.length !== 0 && (
        <div className="checkbox">
          <p>Filter :- {stateCurratedData.state} </p>
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
      )}

      <div className="container">
        <div className="upper-charts">
          <div className="chart">
            <BChart
              structuredWorldMonthlyData={
                monthlyData.length === 0 ? indiaMonthlyData : monthlyData
              }
              month={month}
              key1={"cases"}
              key2={"deaths"}
              key3={"recovered"}
            />
          </div>
          <div className="chart">
            <LChart
              structuredWorldMonthlyData={
                monthlyData.length === 0 ? indiaMonthlyData : monthlyData
              }
              month={month}
              key1={"cases"}
              key2={"deaths"}
              key3={"recovered"}
            />
          </div>
        </div>
        <div className="pie-chart">
          <PChart
            structuredWorldCurratedData={
              Object.keys(indiaData).length === 0
                ? indiaCurratedData
                : indiaData
            }
          />
        </div>
      </div>

      <div className="container-fluid">
        <div className="table-responsive ">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th> State </th>
                <th> Confirmed </th>
                <th> Recovered </th>
                <th> Deaths </th>
                <th> Active </th>
              </tr>
            </thead>
            <tbody>
              {indiaStateData.map((curElem, ind) => {
                return (
                  < >
                    {curElem.state !== "State Unassigned" && ind !== 0 ? (
                      <tr
                        key={ind}
                        onClick={(e) => stateCodeData(indiaStateData[ind])}
                      >
                        <th > {curElem.state} </th>
                        <td> {numeral(curElem.confirmed).format("0,0")} </td>
                        <td> {numeral(curElem.recovered).format("0,0")} </td>
                        <td> {numeral(curElem.deaths).format("0,0")} </td>
                        <td> {numeral(curElem.active).format("0,0")} </td>
                      </tr>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StateData;
