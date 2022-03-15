<template>
  <div class="home">
    <list-movie />
  </div>
</template>

<script>
// @ is an alias to /src
import ListMovie from '@/components/ListMovie.vue'

export default {
  name: 'HomeView',
  components: {
    ListMovie
  }
}
</script>
