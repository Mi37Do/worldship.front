import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api', // No need for full URL; proxy will handle it
})

export default axiosInstance
