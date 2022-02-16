import axios, {AxiosRequestConfig} from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {'Access-Control-Allow-Origin': '*'},
});

const authInterceptor = (config: AxiosRequestConfig) => {
  //@ts-ignore
  config.headers.Authorization = `Bearer: ${localStorage.getItem('token')}`;
  return config;
};

instance.interceptors.request.use(authInterceptor);

export {instance};
