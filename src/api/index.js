import axios from 'axios';

const instance = axios.create({
  // TODO: baseURL
  timeout: 5000,
});

instance.interceptors.request.use((config) => config);

instance.interceptors.request.use((res) => res, (err) => Promise.reject(err));

export default instance;
