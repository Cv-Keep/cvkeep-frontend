import axios from 'axios'
import store from '@/store'
import API from './api.js'
import Utils from '../helpers/utils.js'

const HttpClient = axios.create({
	timeout: 30000,
	withCredentials: true,
	baseURL: process.env.VUE_APP_API_URL,
});

HttpClient.interceptors.request.use(
	config => {
		const token = Utils.storeJWTTokenGet();
		
		config.headers['Content-Type'] = `application/json`;
		config.headers['Application-Language'] = store.state.credentials.lang || API.getDefaultLocale();
		
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}

		return config;
  },

  error => Promise.reject(error)
);

export default HttpClient;