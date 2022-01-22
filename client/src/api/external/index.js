import axios from 'axios';

export const get = async (params) => {
  return axios.post(`/api/external`, params);
};

export const dashboard = async (params) => {
  return axios.post(`/api/external/dashboard`, params);
};