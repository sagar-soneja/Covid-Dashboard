import React, { useEffect } from "react";
import axios from "axios";
import "./India.css";
import StateData from "../../components/StateWiseData/StateData";

import { monthlyDataIndia } from "../../util";
import { indiaTotalData } from "../../util";
import { useDispatch } from "react-redux";

const India = () => {
  const dispatch = useDispatch();
  const getStateData = async () => {
    const res = await axios.get("https://data.covid19india.org/data.json");

    dispatch({
      // india state wise data
      type: "ADD_SWD",
      payload: res.data.statewise,
    });

    const monthlyData = monthlyDataIndia(res.data.cases_time_series);

    dispatch({
      // india monthly data
      type: "ADD_IMD",
      payload: monthlyData,
    });

    const totalData = indiaTotalData(res.data.statewise[0]);

    dispatch({
      // india cumulated data
      type: "ADD_ICD",
      payload: totalData,
    });
  };

  useEffect(() => {
    getStateData();
  }, []);

  return (
    <div className="india">
      <div className="wrapper">
        <StateData />
      </div>
    </div>
  );
};

export default India;
