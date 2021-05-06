import axios from 'axios'
import store from '@/store'
import API from './api.js'

const HttpClient = axios.create({
	timeout: 30000,
	withCredentials: true,
	baseURL: process.env.VUE_APP_API_URL,
});

HttpClient.interceptors.request.use(
  config => {
		config.headers['Content-Type'] = `application/json`;
		config.headers['Application-Language'] = store.state.credentials.lang || API.getDefaultLocale();

		return config;
  },

  error => Promise.reject(error)
);

export default HttpClient;