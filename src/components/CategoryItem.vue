<template>
  <div class="mr-auto">
  <router-link :to="{name: 'category', params: { id: id, categoryRouteMatch: generateSlug(name) }}">
    <button :class="{'cursor-default': active == id,'bg-gray-300': active == id, 'text-blue-600' : active == id, 'disabled': active == id}" class="flex border p-3 m-1 hover:bg-gray-300 transition border-gray-300 cursor-pointer shadow-lg overflow-hidden rounded-full justify-center flex-nowrap items-center max-w-full">
        <div class="text-xs text-gray-800">{{ name }}</div>
    </button>
  </router-link>
  </div>
</template>

<script>
export default {
    name: 'CategoryItem',
    props: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        // VERIFY IF THIS BUTTON IS ACTIVE
        active: {
            type: String,
            required: false
        }
    },

    methods: {
       // GENERATE A SLUG FROM THE TITLE
        generateSlug(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
        
        // remove accents, swap ñ for n, etc
        const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
        const to = 'aaaaeeeeiiiioooouuuunc------';
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes
        
        return str;
      }
    }
}
</script>

<style>

</style>