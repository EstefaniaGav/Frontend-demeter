import axios from "axios";

const API = 'http://localhost:4003/api';

export const getShopping = () => axios.get(`${API}/shopping`);
export const createShopping = shopping => axios.post(`${API}/shopping`, shopping);
export const updateShopping = (id, shopping) => axios.put(`${API}/shopping/${id}`, shopping);
export const deleteShopping = id => axios.delete(`${API}/shopping/${id}`);
export const enableShopping = id => axios.put(`${API}/shopping/enable/${id}`);
