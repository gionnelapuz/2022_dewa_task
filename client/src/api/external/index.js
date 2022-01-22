import axios from 'axios';

export const get = async (params) => {
  return axios.get(params);
};
