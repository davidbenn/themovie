<template>
  <div class="w-full fixed z-50 top-0 bg-gray-200 h-1" v-if="isLoading">
    <div class="bg-blue-600 h-1" :style="{width: progress+'%'}"></div>
  </div>
</template>

<script>
export default {
   name: 'PageLoading',

   props: {
      isLoading: {
         type: Boolean,
         required: true
      },
      progress: {
        type: Number,
        required: true
      }
   },
}
</script>

<style>

</style>