import axios from 'axios';

const url = 'http://localhost:5000/uploads';

export const fetchCsvs = () =>  axios.get(url); 
export const createCsv = (newCsv) =>  axios.post(url, newCsv);
export const updateCsv = (id, updatedCsv) => axios.patch(`${url}/${id}`, updatedCsv);
export const deleteCsv = (id) => axios.delete(`${url}/${id}`);