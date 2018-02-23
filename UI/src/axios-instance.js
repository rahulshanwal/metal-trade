import axios from 'axios';
const config = require('Config');
const instance = axios.create({
    baseURL: config.serverUrl
});

export default instance;