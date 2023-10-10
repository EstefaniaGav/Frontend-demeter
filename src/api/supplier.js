import axios from "axios";

const API = 'http://localhost:4003/api';

export const getSupplier = () => axios.get(`${API}/supplier`);
export const createSupplier = supplier => axios.post(`${API}/supplier`, supplier);
export const updateSupplier = (id, supplier) => axios.put(`${API}/supplier/${id}`, supplier);
export const deleteSupplier = id => axios.delete(`${API}/supplier/${id}`);