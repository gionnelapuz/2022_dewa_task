import axios from 'axios';

export const getData = async (params) => {
  return axios.get(params);
};
