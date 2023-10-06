import axios from "axios";

const API = 'http://localhost:4003/api'

export const registerRequest = Usuario => axios.post(`${API}/register`, Usuario)
