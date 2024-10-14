import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3100/api', // Replace with your API base URL
  withCredentials: true, // Include credentials with requests
});

export default axiosInstance;
