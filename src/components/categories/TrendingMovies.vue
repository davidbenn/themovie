<template>
  <div class="flex flex-col min-h-fit p-5 pb-8 text-gray-800">
      <!-- Component Start -->
	<h1 class="text-lg ml-4 mt-3 uppercase font-bold">Em alta</h1>
	<div class="flex flex-col sm:flex-row sm:items-end sm:justify-between mt-6">
		<span class="text-sm font-semibold ml-4 text-justify">Nas últimas 24 horas</span>
	</div>
	<carousel :settings="settings" :breakpoints="breakpoints">
			<slide v-for="(slide, key) in movies.length" :key="slide">
			  <div>
		     	<div class="carousel__item">
					 <div class="grid 2xl:grid-cols-5 xl:grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6">
						<a href="#" class="block h-64 rounded-lg shadow-lg bg-white overflow-hidden w-44">
							<img :src="$movie_poster_path+movies[key].poster_path" alt="" class="">
						</a>
					 </div>
				</div>
              </div>
		</slide>

			<template #addons>
				<navigation />
			</template>
       </carousel>
  </div>
</template>

<script>

import 'vue3-carousel/dist/carousel.css';

import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
    name: 'TrendingMovies',
    components: {
		Carousel,
		Slide,
		Pagination,
		Navigation,
  },
    data() {
        return {
            movies: [],
            settings: {
				itemsToShow: 1,
                snapAlign: 'center',
			},
			breakpoints: {
				// 700px and up
				700: {
					itemsToShow: 3.5,
					snapAlign: 'center',
				},
				// 1024 and up
				1024: {
					itemsToShow: 5,
					snapAlign: 'start',
				},
            },
        } 
    },

    async mounted(){
        try{
           await this.$http.get('/trending/movie/day').then(response=>{
               this.movies = response.data.results.reverse();
           });
        }catch(e){
            console.log(e);
        }
    }
}
</script>

<style>

</style>