import axios from 'axios';

export const checkAuthenticated = async () => {
  return axios.get(`/api/auth/`);
};

export const login = async (params) => {
  return axios.post(`/api/auth/login`, params);
};

export const logout = async (params) => {
  return axios.post(`/api/auth/logout`, params);
};