<template>
  <div>
      <div class="flex flex-row w-full h-96 bg-slate-400">
         <div class="flex w-3/4 m-auto ">
              <div class="block m-2 rounded-md bg-gray-500 overflow-hidden h-64 w-80 shadow-md">
                 <img v-if="movie.poster_path != null" :src="$movie_poster_path+movie.poster_path" alt="" class="block w-full h-full">
                 <figure v-else class="block w-full h-full bg-slate-600"></figure>
              </div>
              <div class="flex flex-col ml-52 mb-16">
                  <span class="text-lg font-medium text-gray-700">{{ movie.title }}</span>
                  <p class="text-xs text-gray-400">{{ movie.overview }}</p>
              </div>
         </div>
      </div>
  </div>
</template>

<script>
export default {
   name: 'MovieView',
  
   data: function(){
      return {
          movie: []
      }
   },

   methods: {
      async requestMovie(id){
          try{
            const response = await this.$http.get("/movie/" + id);
            this.movie = response.data;
          } catch (e){
            console.log(e);
          }
      }
   },

   created(){

      // GET THE MOVIE ID FROM THE URL
      this.$watch(
        () => this.$route.params.id,
        (newid) => {
            this.requestMovie(newid);
        }
      )
   },

   mounted() {
      this.requestMovie(this.$route.params.id);
   },
}
</script>

<style>

</style>