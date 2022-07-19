import axios from 'axios'
const http = axios.create({
    baseURL: 'https://api.github.com/repos',
    timeout: 6000,
})

http.interceptors.response.use(
    response => {
        if (response.status !== 200)
            return Promise.reject(new Error(response.statusText || 'status code error!'))
        return response.data
    }
)
export default http