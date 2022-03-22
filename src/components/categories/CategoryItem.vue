<template>
  <div class="mr-auto">
  <router-link :to="{name: 'category', params: { id: categoryId, categoryRouteMatch: getRoute }}">
    <button :class="{'cursor-default': active == categoryId,'bg-gray-300': active == categoryId, 'text-blue-600' : active == categoryId, 'disabled': active == categoryId}" class="flex border p-3 m-1 hover:bg-gray-300 transition border-gray-300 cursor-pointer shadow-lg overflow-hidden rounded-full justify-center flex-nowrap items-center max-w-full">
        <div class="text-xs text-gray-800">{{ categoryName }}</div>
    </button>
  </router-link>
  </div>
</template>

<script>
export default {
    name: 'CategoryItem',
    props: {
        categoryRoute: {
            type: String,
            required: true
        },
        categoryName: {
            type: String,
            required: true
        },
        categoryId: {
            type: Number,
            required: true
        },
        // VERIFY IF THIS BUTTON IS ACTIVE
        active: {
            type: String,
            required: false
        }
    },

    computed: {
        getRoute(){
             return this.categoryRoute
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        }
    }
}
</script>

<style>

</style>