import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";


const structureData = (data) => {
  let new_data = {};

  for (const date in data.cases) {
    const [month, day, year] = date.split("/");

    const monthYear = `${month}/${year}`;
    if (!new_data[monthYear]) {
      new_data[monthYear] = {
        name: monthYear,
        cases: 0,
        deaths: 0,
        recovered: 0,
      };
    }

    new_data[monthYear].cases += data.cases[date];
    new_data[monthYear].deaths += data.deaths[date] || 0;
    new_data[monthYear].recovered += data.recovered[date] || 0;
  }

  const formatted_new_data = Object.values(new_data);
  return formatted_new_data;
};

const strucuteCurratedData = (data) => {
  delete data.activePerOneMillion;
  delete data.casesPerOneMillion;
  delete data.oneCasePerPeople;
  delete data.critical;
  delete data.oneDeathPerPeople;
  delete data.criticalPerOneMillion;
  delete data.oneTestPerPeople;
  delete data.deathsPerOneMillion;
  delete data.recoveredPerOneMillion;
  delete data.testsPerOneMillion;
  delete data.todayCases;
  delete data.todayDeaths;
  delete data.todayRecovered;
  delete data.affectedCountries;
  delete data.updated;

  const new_data = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));
  return new_data;
};

const monthlyDataIndia = (casetimeseries) => {
  let data = [];
  let monthData = [];
  casetimeseries.forEach((entry) => {
    const dateParts = entry.dateymd.split("-");
    const yearMonth = `${dateParts[0]}-${dateParts[1]}`;

    if (!monthData[yearMonth]) {
      monthData[yearMonth] = {
        totalconfirmed: 0,
        totaldeceased: 0,
        totalrecovered: 0,
      };
    }
    monthData[yearMonth].totalconfirmed += parseInt(entry.totalconfirmed);
    monthData[yearMonth].totaldeceased += parseInt(entry.totaldeceased);
    monthData[yearMonth].totalrecovered += parseInt(entry.totalrecovered);
  });

  for (const yearMonth in monthData) {
    data.push({
      name: yearMonth,
      cases: monthData[yearMonth].totalconfirmed,
      deaths: monthData[yearMonth].totaldeceased,
      recovered: monthData[yearMonth].totalrecovered,
    });
  }

  return data;
};

const indiaTotalData = (data) => {
  delete data.deltaconfirmed;
  delete data.deltadeaths;
  delete data.deltarecovered;
  delete data.lastupdatedtime;
  delete data.migratedother;
  delete data.state;
  delete data.statecode;
  delete data.statenotes;

  const new_data = Object.entries(data).map(([name, value]) => ({
    name,
    value: parseInt(value, 10),
  }));
  return new_data;
};

const structuredWorldCountryData = (data) => {
  const transformedData = [];

  for (const entry of data) {
    const transformedEntry = {
      country: entry.country,
      confirmed: entry.cases,
      recovered: entry.recovered,
      deaths: entry.deaths,
      active: entry.active,
      tests: entry.tests,
    };
    transformedData.push(transformedEntry);
  }

  return transformedData;
};

const stateDataStructure = (data) => {
  const result = {};
  const dataArray = Object.entries(data).map(([date, values]) => ({
    date,
    ...values.total,
  }));

  for (const entry of dataArray) {
    const [year, month] = entry.date.split("-");
    const monthAndYear = `${month}-${year}`;

    if (!result[monthAndYear]) {
      result[monthAndYear] = { cases: 0, deaths: 0, recovered: 0 };
    }

    result[monthAndYear].cases += isNaN(entry.confirmed) ? 0 : entry.confirmed;
    result[monthAndYear].deaths += isNaN(entry.deceased) ? 0 : entry.deceased;
    result[monthAndYear].recovered += isNaN(entry.tested) ? 0 : entry.tested;
  }

  const finalResult = Object.entries(result).map(
    ([name, { cases, deaths, recovered }]) => {
      return { name, cases, deaths, recovered };
    }
  );
  const stateSum = {
    cases: 0,
    deaths: 0,
    recovered: 0,
  };

  for (const entry of finalResult) {
    stateSum.cases += entry.cases;
    stateSum.deaths += entry.deaths;
    stateSum.recovered += entry.recovered;
  }

  const transformedData = [
    { name: "cases", value: stateSum.cases },
    { name: "deaths", value: stateSum.deaths },
    { name: "recovered", value: stateSum.recovered },
  ];

  return { finalResult, transformedData };
};

// for graph circle
const casesTypeColors = {
  cases: {
    hex: "#1d52d7",
    multiplier: 300,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 400,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

const showDataOnMap = (data, casesType = "cases") =>
  data.map((country, ind) => (
    <Circle key={ind}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup key={ind}>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

// filter
const filterDataByMonth = (inputMonth, data) => {
  const filteredData = data.filter((entry) => {
    const [month] = entry.name.split("/");
    return parseInt(month) % inputMonth === 0;
  });
  return filteredData;
};

export {
  filterDataByMonth,
  stateDataStructure,
  structureData,
  strucuteCurratedData,
  monthlyDataIndia,
  indiaTotalData,
  structuredWorldCountryData,
  showDataOnMap,
};
