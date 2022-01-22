import axios from 'axios';

export const get = async (params) => {
  return axios.post(`/api/external`, params);
};