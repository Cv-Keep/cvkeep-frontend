import axios from 'axios'
import store from '@/store'
import API from './api.js'

const HttpClient = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
	timeout: 2000,
	withCredentials: true
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