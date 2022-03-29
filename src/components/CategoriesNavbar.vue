<template>
   <div class="md:flex m-auto rounded-md w-5/6 h-auto flex-wrap justify-start items-center bg-white px-3 pt-3 pb-3 shadow-md mt-10 mb-4">
        <h1 class="text-lg font-medium ml-6 mt-3">O que assistir</h1>
        <div class="flex m-auto w-full h-auto flex-wrap justify-start items-center p-5">
            <CategoryItem v-for="(category, key) in categories.length" :key="category" :active="btn" :name="categories[key].name" :id="categories[key].id" />
        </div>
   </div>
</template>

<script scoped>

import CategoryItem from '@/components/CategoryItem.vue'

export default {
    name: 'CategoriesBar',
    props: {
        'btn': {
            type: String,
            required: false
        }
    },
    data() {
        return {
           categories: [],
           category: 0
        }
    },

    async mounted(){
        try{
           await this.$http.get('/genre/movie/list').then(response=>{
               this.categories = response.data.genres;
           });
        }catch(e){
            console.log(e);
        }
    },

    components: {
        CategoryItem
    },
}
</script>

<style scoped>


</style>