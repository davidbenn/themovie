<template>
  <div class="home">
    <categories-navbar />
    <painel-categories />
  </div>
</template>

<script>
// @ is an alias to /src
import CategoriesNavbar from '@/components/CategoriesNavbar.vue'
import PainelCategories from '@/components/PainelCategories.vue'

export default {
  name: 'HomeView',
  components: {
    CategoriesNavbar,
    PainelCategories
  }
}
</script>

<style>
  
</style>
