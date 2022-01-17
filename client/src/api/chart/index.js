import axios from 'axios';

export const getAll = async (params) => {
  return axios.post(`/api/charts/`, params);
};

export const storeChart = async (params) => {
  return axios.post(`/api/charts/user`, params);
};

export const deleteChart = async (params) => {
  return axios.post(`/api/charts/user`, params);
};