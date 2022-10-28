import axios from 'axios';

const APIHubla = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 20000,
    headers: {
        contentType: "application/json",
        accept: "application/json",
    },
    params: {
        file: [],
    },
});

export default APIHubla;

