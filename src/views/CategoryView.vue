<template>
   <page-loading :isLoading="loading" :progress="progressLoading" />
   <categorias-navbar :btn="$route.params.id" />
   <div class="block m-auto mt-8 w-5/6 bg-white shadow-md relative">
      <div class="flex flex-col min-h-fit p-5 pb-8 text-gray-800">
      <!-- Component Start -->
         <div class="flex justify-start items-center">
           <h1 class="text-lg ml-4 mt-3 mb-5 uppercase font-bold">{{ genreName }}</h1>
           <div class="flex justify-center">
  <div class="mb-3 xl:w-96">
    <select class="form-select appearance-none
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
        <option selected>Sugestão para você</option>
        <option value="1">Mais recentes</option>
        <option value="2">Mais populares</option>
        <option value="3">Mais antigos</option>
    </select>
  </div>
</div>
         </div>
         <div class="flex justify-start flex-wrap">
            <MovieItem v-for='movie in movieList' :key="movie.id" :imagePath="movie.poster_path" />
         </div>
      </div>
   </div>
</template>

<script scoped>

import CategoriasNavbar from '@/components/CategoriesNavbar.vue'
import MovieItem from '@/components/MovieItem';
import PageLoading from '@/components/utils/PageLoading.vue';

export default {
   name: 'CategoryView',
   components: {
     CategoriasNavbar,
     PageLoading,
     MovieItem
   },

   data: function() {
      return {
         genreName: '',
         movieList: [],
         loading: false,
         progressLoading: 0,
      }
   },

   methods: {
      async RequestMovieList(id){

        // BEFORE LOADING
        this.loading = true;

        const response = await this.$http.get('/discover/movie?with_genres=' + id);

        setTimeout(()=> {
         
           this.movieList = response.data.results;

           // AFTER LOADING
           this.loading = false;

        } , 2000);

      },

      async RequestGenreName(id){

         const response = await this.$http.get('/genre/movie/list');

         this.genreName = response.data.genres.filter(genre => { 
               return genre.id == id;
         })[0].name;
      }
   },
   
   created: function() {

      // ALTERAÇÃO DO ID, FAZ UM NOVA REQUISIÇÃO PARA O GENRE NAME E A LISTA DE FILMES POR CATEGORIA.
      this.$watch(
         () => this.$route.params.id,
         (newid) => {
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