import axios from 'axios'

const API = axios.create({
    baseURL: 'http://6392-136-169-211-95.ngrok.io/api'
})

export {
    API
}