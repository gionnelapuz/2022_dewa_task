import axios from "axios";

export const getAllChartTypes = async (params) => {
  return axios.get(`/api/charts`, params);
};
