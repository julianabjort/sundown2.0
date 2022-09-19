<template>
  <div class="flex justify-center">
    <div
      class="
        flex
        w-4/5
        align-center
        justify-between
        my-28
        items-center
        relative
      "
    >
      <div class="absolute -z-10 w-full h-1 line bg-gray-500"></div>
      <button
        class="
          text-white
          rounded-full
          w-6
          text-center
          font-bold
          cursor-pointer
          mx-20
        "
        v-for="step in steps"
        :key="step.name"
        @click="goToStep(step)"
        :class="step.id === activeStep ? 'bg-blue-500' : 'bg-gray-300'"
      >
        {{ step.id + 1 }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeStep: 0,
      steps: [
        {
          id: 0,
          name: "details",
        },
        {
          id: 1,
          name: "images",
        },
        {
          id: 2,
          name: "location",
        },
        {
          id: 3,
          name: "finalise",
        },
      ],
    };
  },
  methods: {
    goToStep(step) {
      this.activeStep = step.id;
      // Gsap animate the step here
    },
  },
};
</script>

<style>
</style>