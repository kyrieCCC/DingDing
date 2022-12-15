import axios from 'axios'

const HTTP_URL = 'http://127.0.0.1:8081/'

const http = axios.create({
    baseURL: HTTP_URL
})

export default http