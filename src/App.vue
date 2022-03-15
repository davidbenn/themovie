<template>
  <nav-header />
  <router-view/>
  <nav-footer />
</template>

<script scoped>

import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'

export default {

  components: {
    NavHeader,
    NavFooter
  },
  
}
</script>

<style>

</style>
