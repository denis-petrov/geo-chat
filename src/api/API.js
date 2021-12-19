import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost/api'
})

export {
    API
}