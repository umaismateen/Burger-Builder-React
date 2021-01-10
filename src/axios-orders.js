import axios from 'axios';
import apiKey from './ApiKey/ApiKey';
const instance = axios.create({
    baseURL: apiKey,
});

export default instance;   