import { createStore } from 'vuex'

import api from '@/services/api'

export default createStore({
    state(){
        return {
            movies: []
        }
    },

    mutations: {
        SET_CATEGORIES_MOVIES(state, movies){
            state.movies = movies
        }
    },

    actions: {
        async getMoviesCategories({ commit }, id){

            const response = await api.get('/discover/movie?with_genres='+id);

            commit('SET_CATEGORIES_MOVIES', response.data.results);

        }
    }
})