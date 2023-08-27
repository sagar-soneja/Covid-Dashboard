const initialState = {
  worldMonthlyData: [],
  worldCurratedData: {},
  indiaStateData: [],
  indiaMonthlyData: [],
  indiaCurratedData: [],
  worldCountryData: [],
  news : []
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_WMD":
      return { ...state, worldMonthlyData: action.payload };
    case "ADD_WCD":
      return { ...state, worldCurratedData: action.payload };
    case "ADD_SWD":
      return { ...state, indiaStateData: action.payload };
    case "ADD_IMD":
      return { ...state, indiaMonthlyData: action.payload };
    case "ADD_ICD":
      return { ...state, indiaCurratedData: action.payload };
    case "ADD_WCOD":
      return { ...state, worldCountryData: action.payload };
    case "ADD_NEWS":
      return { ...state, news: action.payload };
    default:
      return state;
  }
};
