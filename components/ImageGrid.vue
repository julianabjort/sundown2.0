<template>
  <div>
    <div class="h-auto md:h-96 border-2 rounded-md overflow-auto">
      <div
        class="
          w-full
          h-auto
          p-2
          grid grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-2
          grid-rows-auto
          mb-4
        "
      >
        <slot />
        <div
          v-for="(image, index) in images"
          :key="image.id"
          class="w-full relative"
        >
          <img
            class="rounded-md w-full cursor-pointer object-cover aspect-square"
            :src="image.img_src"
            alt=""
            @click="$emit('imageClick', { image, index })"
          />
          <p class="absolute bottom-1 left-1 text-xs text-white">
            {{ image.cameraName }} - {{ image.roverText }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cameraName: {
      type: String,
    },
    roverText: {
      type: String,
    },
    images: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
</style>