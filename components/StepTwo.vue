<template>

<div>
    <div class="text-center my-10">
        <h1 class="heading-1">MRT</h1>
    </div>

     <div class="flex mx-48 space-x-20">
        <div class="w-1/2">
            <h3 class="heading-3">Space mission image bank</h3>
            <div class="w-full h-[460px] border-2 flex flex-wrap justify-around overflow-auto">
                
                <p v-if="$fetchState.pending">Fetching images...</p>
                <p v-else-if="$fetchState.error">An error occurred :(</p>

                <div v-else v-for="image in images" :key="image.title">
                    <img
                    class="rounded-sm h-36 w-36 m-1 cursor-pointer" 
                    :src="image.image" alt=""
                    v-lazy-load
                    @click="selectImage(image.image)"
                    >
                </div>
            </div>
        </div>
        <div class="w-1/2">
            <h3 class="heading-3">Selected images to report</h3>
            <div class="w-full h-[460px] border-2 flex flex-wrap justify-around overflow-auto">
                <div v-for="image in selectedImages" :key="image.id">
                    <img
                    class="rounded-sm h-36 w-36 m-1" 
                    :src="image" alt=""
                    v-lazy-load
                    >
                </div>
        </div>
        <slot name="nextButton"/>
    </div>
     
</div>
<div class="absolute left-10 bottom-10">
        <slot name="backButton"/>
    </div>
</div>
  
</template>

<script>
export default {
    data() {
      return {
        images: [],
      }
    },
    async fetch() {
      this.images = await fetch(
        'https://api.nuxtjs.dev/mountains'
      ).then(res => res.json())
      
    },
    methods: {
    
    selectImage(img) {
        this.selectedImages = [...this.selectedImages, img] 
    },
    },

    computed: {
        selectedImages: {
        get() {
                return this.$store.state.selectedImages
            },
            set(value) {
                if (this.selectedImages.length < 7){
                this.$store.commit('setSelectedImages', {selectedImages: value})
            }
            else {
                alert("maximum 7 images allowed")
            }
            }
        }
    }
}
</script>