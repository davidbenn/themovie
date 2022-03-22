import axios from 'axios'

const token = '07eeda560637d3e164d0c1452c34cf5f';

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
       api_key: token,
       language: 'pt-BR'
    }
});