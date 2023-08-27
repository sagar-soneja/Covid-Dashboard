import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header/Header";
import Map from "../../components/Map/Map";
import Graph from "../../components/Graphs/Graph";

const Home = () => {
  const dispatch = useDispatch();

  const fetchWorldMonthlyData = async () => {
    var { data } = await axios.get(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    );
    dispatch({
      type: "ADD_WMD",
      payload: data,
    });
  };

  const fetchWorldCurratedData = async () => {
    var { data } = await axios.get("https://disease.sh/v3/covid-19/all");
    dispatch({
      type: "ADD_WCD",
      payload: data,
    });
  };

  const fetchWorldCountryData = async () => {
    var { data } = await axios.get("https://disease.sh/v3/covid-19/countries");
    

    dispatch({
      type: "ADD_WCOD",
      payload: data,
    });
  };

  useEffect(() => {
    fetchWorldMonthlyData();
    fetchWorldCurratedData();
    fetchWorldCountryData();
  }, []);

  const state = useSelector((state) => state);

  const { worldCountryData } = state;
  return (
    <div>
      <Header />
      <Graph />
      <Map
        countries={worldCountryData}
        caseType={"cases"}
        lat={34.80746}
        log={40.4796}
        zoom={3}
      />
    </div>
  );
};

export default Home;
