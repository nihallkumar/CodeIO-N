import axios from "axios";
const url = 'http://127.0.0.1:4001';

export const compileCode = (data) => axios.post(`${url}/compile`, data);
