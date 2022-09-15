<template>
  <div>
    <div
      v-if="show"
      class="fixed flex w-screen h-screen z-10 items-center justify-center"
    >
      <div
        @click="$emit('close')"
        class="absolute w-full h-full bg-black opacity-30"
      ></div>
      <div class="relative w-1/3 h-auto bg-white rounded-md px-16 py-10 z-20">
        <slot />
        <p
          @click="$emit('close')"
          class="absolute top-2 right-4 cursor-pointer text-xl text-gray-400"
        >
          x
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
