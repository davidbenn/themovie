<template>
  <div class="block m-auto mt-8 w-5/6">
	  <popular-movies class="shadow-md mb-7 bg-white"></popular-movies>
	  <trending-movies class="shadow-md mb-7 bg-white"></trending-movies>
	  <year-movies class="shadow-md mb-7 bg-white"></year-movies>
  </div>
</template>

<script>
// CATEGORIES COMPONENT EXISTS IN HOMEVIEW.VUE

import PopularMovies from './categories/PopularMovies.vue'
import TrendingMovies from './categories/TrendingMovies.vue'
import YearMovies from './categories/YearMovies.vue'

export default {
    name: 'ListView',
    components: {
		PopularMovies,
		TrendingMovies,
		YearMovies
    },
    data() {
        return {
            
        } 
    },
}
</script>

<style>
    .carousel__next{
		background-color: #407EE9 !important;
		border: 0.4rem solid #fff !important;
		box-sizing: content-box;
		margin-right: 10px;
	}
	.carousel__prev{
		background-color: #407EE9 !important;
		border: 0.4rem solid #fff !important;
		box-sizing: content-box;
		margin-left: 10px;
	}
</style>