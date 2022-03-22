import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './services/api'
import Vuex from 'vuex'
import store from '@/store/index'
// TAILWIND.CSS
import './index.css'

const app = createApp(App)
.use(Vuex)
.use(router)

// DEFINIÇÃO GLOBAL DA REQUISIÇÃO HTTP (AXIOS)
app.config.globalProperties.$http = axios;
app.config.globalProperties.$store = store;

// URL PATH (IMG/MOVIE) GLOBAL
app.config.globalProperties.$movie_poster_path = 'https://image.tmdb.org/t/p/w500';

app.mount('#app');
