<template>
  <div>
    <div v-for="image in images" :key="image.id" class="w-full relative">
      <img
        class="rounded-md w-full cursor-pointer object-cover aspect-square"
        :src="image.img"
        alt=""
        @click="imageClick(image)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped></style>
