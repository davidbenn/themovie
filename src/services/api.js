import axios from 'axios'

// LOADING
import '../../node_modules/nprogress/nprogress.css'

import nprogress from 'nprogress'

const tokenPublic = '07eeda560637d3e164d0c1452c34cf5f';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
       api_key: tokenPublic,
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