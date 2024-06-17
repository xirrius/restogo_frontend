import axios from 'axios'
import Cookies from 'js-cookie'

// const API_BASE_URL = "http://127.0.0.1:8000/api/orders"; 

const API_BASE_URL = "https://restogo-backend.onrender.com/api/orders";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
    config => {
        const csrftoken = Cookies.get('csrftoken')
        if(csrftoken) {
            config.headers['X-CSRFToken'] = csrftoken
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default api