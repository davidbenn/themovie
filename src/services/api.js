import axios from 'axios'

// LOADING
import '../../node_modules/nprogress/nprogress.css'

import nprogress from 'nprogress'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
       api_key: process.env.VUE_APP_API_KEY,
       language: 'pt-BR'
    }
});

// LOADING DATA PROGRESS

instance.interceptors.request.use(request => {
    nprogress.start()
    return request
})

instance.interceptors.response.use(response => {
    nprogress.done()
    return response
})

export default instance