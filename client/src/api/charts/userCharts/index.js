import axios from "axios";

export const getAllCharts = async (params) => {
  return axios.get(`/api/charts/user`, params);
};

export const storeChart = async (params) => {
  return axios.post(`/api/charts/user`, params);
};

export const deleteChart = async (params) => {
  return axios.delete(`/api/charts/user/${params.id}`);
};
