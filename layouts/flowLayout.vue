<template>
<div>
    <div class="text-center my-10">
        <NuxtLink to="/dashboard" class="heading-1">MRT</NuxtLink>
    </div>
    <div class="flex w-full mb-10 mx-48 items-center">

        <p class="bg-indigo-500 text-white rounded-full w-6 text-center font-bold">1</p>

        <div class="w-1/5 h-1" :class="isImagesPage || isLocationPage || isFinalPage ? 'bg-black' : 'bg-white'"></div>

        <p class="bg-indigo-500 text-white rounded-full w-6 text-center font-bold">2</p>

        <div class="w-1/5 h-1" :class="isLocationPage || isFinalPage ? 'bg-black' : 'bg-white'"></div>

        <p class="bg-indigo-500 text-white rounded-full w-6 text-center font-bold">3</p>

        <div class="w-1/5 h-1" :class="isFinalPage ? 'bg-black' : 'bg-white'"></div>

        <p class="bg-indigo-500 text-white rounded-full w-6 text-center font-bold">4</p>

    </div>
    <NuxtChild />
</div>
  
</template>

<script>
export default {

computed: {
    isImagesPage() {
        return this.$route.path === '/images'
    },
    isLocationPage() {
        return this.$route.path === '/location'
    },
    isFinalPage() {
        return this.$route.path === '/finalise'
    },

}

}
</script>

