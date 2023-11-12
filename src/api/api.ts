import axios from 'axios';

const BASE_URL = 'https://staffmun-cfa0732aa74e.herokuapp.com/api' || 'http://localhost:3001/api';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (
  name: string,
  lastname: string,
  email: string,
  password: string
) => {
  const response = await axios.post(`${BASE_URL}/signup`, {
    name,
    lastname,
    email,
    password,
  });
  return response.data;
};

export const getUserAvailability = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/getting/${id}`);
  return response.data;
};

export const createUserAvailability = async ( availability: any) => {
  const response = await axios.post(`${BASE_URL}/creating`, {
    userId: availability.userId,
    available: availability.available,
  });
  return response.data;
};

export const allUsersAvailability = async () => {
  const response = await axios.get(`${BASE_URL}/getting`);
  return response.data;
}
