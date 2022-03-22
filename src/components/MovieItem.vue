<template>
    <div class="m-auto">
        <a href="#" class="block m-2 rounded-md bg-gray-500 shadow-md overflow-hidden h-64 w-44">
            <img :src="$movie_poster_path+imagePath" alt="" class="block w-full h-full">
        </a>
    </div>
</template>

<script>
export default {
    name: 'ItemMovie',
    props: {
        imagePath: {
            type: String,
            required: true
        }
    }
}
</script>

<style>

</style>