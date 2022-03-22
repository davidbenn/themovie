<template>
  <nav-header />
  <router-view/>
  <nav-footer />
</template>

<script scoped>

import NavHeader from '@/components/layouts/NavHeader.vue'
import NavFooter from '@/components/layouts/NavFooter.vue'

export default {

  components: {
    NavHeader,
    NavFooter
  },
  
}
</script>

<style>
html{
  overflow-x: hidden !important;
}

body{
   background-color: #F3F3F3;
}
</style>
