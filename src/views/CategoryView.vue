<template>
   <categorias-navbar :btn="$route.params.id" />
   <div class="block m-auto mt-8 w-5/6 bg-white shadow-md relative">
      <div class="flex flex-col min-h-fit p-5 pb-8 text-gray-800">
      <!-- Component Start -->
         <div class="flex justify-start items-center">
           <h1 class="text-lg ml-4 mt-3 mb-5 uppercase font-bold">{{ genreName }}</h1>
           <div class="flex justify-center">
  <div class="mb-3 xl:w-96">
    <select v-model="filterMovies" class="form-select appearance-none
      block w-52
      px-3
      py-1.5
      text-xs
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      ml-5
      mt-1
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
        <option value="" disabled>Selecione um filtro</option>
        <option value="suggestion">Sugestão para você</option>
        <option value="recent">Mais recentes</option>
        <option value="popular">Mais populares</option>
        <option value="older">Mais antigos</option>
    </select>
  </div>
</div>
         </div>
         <div class="flex justify-start flex-wrap">
            <MovieItem v-for='movie in filterMoviesList' :key="movie.id" :imagePath="movie.poster_path" />
         </div>
      </div>
      <div class="flex flex-col items-center m-10 mb-20 relative">
  <!-- Help text -->
  <span class="text-sm text-gray-700 dark:text-gray-400">
      Mostrando <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.page }}</span> até <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.limit }}</span> de <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.totalResults }}</span> resultados
  </span>
  <div class="inline-flex mt-2 xs:mt-0 mb-14">
    <!-- Buttons -->
    <button @click.prevent="pagination.page-- && RequestMovieList($route.params.id)" v-show="pagination.page > 1" class="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <svg class="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
        Anterior
    </button>
    <button @click.prevent="pagination.page++ && RequestMovieList($route.params.id)" class="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        Próxima
        <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  </div>
</div>
   </div>
</template>

<script scoped>

import CategoriasNavbar from '@/components/CategoriesNavbar.vue'
import MovieItem from '@/components/MovieItem';

export default {
   name: 'CategoryView',
   components: {
     CategoriasNavbar,
     MovieItem
   },

   data: function() {
      return {
         genreName: '',
         movieList: [],
         filterMovies: null,
         pagination: {
            page: 1,
            totalResults: 0,
            totalPages: 0,
            limit: 0,
            currentPage: ''
         },
      }
   },

   methods: {
      async RequestMovieList(id){

         const response = await this.$http.get('/discover/movie?with_genres=' + id + '&page=' + this.pagination.page);

         this.pagination.page = response.data.page;
         this.pagination.totalResults = response.data.total_results;
         this.pagination.totalPages = response.data.total_pages;
         this.pagination.limit = response.data.results.length;

         this.movieList = response.data.results;

      },

      async RequestGenreName(id){

         const response = await this.$http.get('/genre/movie/list');

         this.genreName = response.data.genres.filter(genre => { 
               return genre.id == id;
         })[0].name;
      },
   },

   computed: {
      filterMoviesList(){
         // REORDER MOVIES LIST SIMPLY
         switch(this.filterMovies){
            case 'suggestion':
               // SUGESTÃO ALEATÓRIA DE TITULOS COM BASE NO GENERO
               return this.movieList.sort((a, b) =>{
                  return 0.5 - Math.random();
               });
             break;
            case 'recent':
              return this.movieList.sort((a, b) => {
                  if(b.release_date < a.release_date){
                     return -0.5;
                  } 
              });
            break;
            case 'popular':
               return this.movieList.filter(movie => {
                 return Math.round(movie.vote_average) >= 7;
              });
            break;

            case 'older':
               return this.movieList.sort((a, b)=> {
                   if(b.release_date > a.release_date){
                        return -1;
                   }
              });
            break;
         }

         return this.movieList;
      },
   },
   
   created: function() {

      // ALTERAÇÃO DO ID, FAZ UM NOVA REQUISIÇÃO PARA O GENRE NAME E A LISTA DE FILMES POR CATEGORIA.
      this.$watch(
         () => this.$route.params.id,
         (newid) => {
            this.filterMovies = '';
            this.pagination.page = 1;
            this.RequestMovieList(newid);
            this.RequestGenreName(newid);
         },
         { immediate: true }
      )

   },

   mounted() {
      this.RequestMovieList(this.$route.params.id);
      this.RequestGenreName(this.$route.params.id);
   },
}
</script>

<style>

</style>