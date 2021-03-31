import axios from 'axios';


export const client = axios.create({
    // baseURL: 'http://localhost:8800'
});
export const CancelToken = axios.CancelToken;

export default client;

