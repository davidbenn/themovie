import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './services/api'
// TAILWIND.CSS
import './index.css'

const app = createApp(App)
.use(router)

// DEFINIÇÃO GLOBAL DA REQUISIÇÃO HTTP (AXIOS)
app.config.globalProperties.$http = axios;

// URL PATH (IMG/MOVIE) GLOBAL
app.config.globalProperties.$movie_poster_path = 'https://image.tmdb.org/t/p/w500';

app.mount('#app');
