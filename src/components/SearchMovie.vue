<template>
  <div class="hidden w-96 relative mr-3 md:mr-0 md:block">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input @click.stop="searchQuery.length >= 1 && !isSearch ? isSearch = true : !isSearch" type="text" v-model.trim="searchQuery" class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Qual título você procura?">

        <div @click.stop id="searchbox" v-show="isSearch" class="flex flex-col max-h-80 z-50 overflow-hidden overflow-y-scroll absolute w-full shadow-md bg-white h-auto rounded-lg mt-1">
           <div v-for="movie in search.list" :key="movie" class="flex hover:bg-gray-200 cursor-pointer transition justify-start items-start w-full bg-slate-50 px-2 pt-2 pb-2">
               <span class="w-12 h-full block relative bg-gray-400 rounded-sm overflow-hidden">
                    <img v-if="movie.poster_path != null" :src="$movie_poster_path+movie.poster_path" class="w-12 h-16 block relative bg-slate-600">
                    <figure v-else class="w-12 h-16 block relative bg-slate-600"></figure>
               </span>
               <div class="ml-2">
                  <span class="text-sm font-medium text-gray-700">{{ movie.title }}</span>
                  <p v-if="movie.overview.length" class="text-xs text-gray-400">{{ movie.overview.substr(0, 50) + '...' }}</p>
                  <p v-else class="text-xs text-red-400">Sem descrição</p>
               </div>
           </div>
        </div>
        <div v-show="search.notfound" @click.stop class="flex flex-col max-h-80 z-50 overflow-hidden absolute w-full shadow-md bg-white h-auto rounded-lg mt-1">
          <div class="flex w-full h-10 text-center justify-center items-center">
                <span class="text-xs mb-1 font-medium text-gray-400">Não encotramos resultados com esses termos :(</span>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SearchMovie',

  data() {
    return {
      searchQuery: '',
      search: {
        list: [],
        results: 0, // number of results
        notfound: false,
      },
      isSearch: false
    }
  },

  methods: {
    async onSearch(query) {
        try {

           const response = await this.$http.get('/search/movie?language=pt-BR&query=' + query);

           // NEW PROMISE (LIST OF MOVIES AND RESULTS)
           return { 
              list: response.data.results,
              results: response.data.results.length,
           }
  
        } catch(e){
           // CASO ERRO NA REQUISIÇÃO
           console.log(e);
        }
    }
  },

  created(){

     // LISTENER FOR SEARCH QUERY
     this.$watch(
         () => this.searchQuery,
         async (query) => {
            // SE A QUERY FOR MENOR QUE 1 CARACTERES
            if(query.length >= 1){
              
              // NEW PROMISE (LIST OF MOVIES AND RESULTS)
              const { list, results } = await this.onSearch(query);
              
              // SE NÃO TIVER RESULTADOS
              if(results == 0){
                this.search.results = results;
                this.search.notfound = true;
                this.isSearch = false;
              }else{
                // SE TIVER RESULTADOS
                this.search.list = list;
                this.search.results = results;
                this.search.notfound = false;
                this.isSearch = true;
              }
                
            }else{
                this.search.notfound = false;
                this.isSearch = false;
            }
         },
         { immediate: true }
      )

      // VERIFICA SE USUARIO DEU UM CLIQUE FORA DO SEARCHBOX
      window.onclick = () => {
          this.isSearch = false;
          this.search.notfound = false;
      }
  }
}
</script>

<style scoped>
   #searchbox::-webkit-scrollbar{
      width: 7px;
      box-sizing: content-box;
   }

   #searchbox::-webkit-scrollbar-thumb{
      border-radius: 100px;
      background-color: #ccc !important;
      background-clip: content-box;
   }
</style>