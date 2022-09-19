<template>
  <div v-if="user">
    <div class="text-center my-10">
      <div class="flex items-center justify-center">
        <NuxtLink to="/dashboard" class="heading-1 mr-2">MRT™</NuxtLink>
        <img src="../assets/images/logo.png" class="w-auto h-10" alt="logo" />
      </div>
    </div>
    <div class="flex justify-center">
      <div
        class="
          flex
          w-4/5
          align-center
          justify-between
          mb-10
          items-center
          relative
        "
      >
        <div class="absolute -z-10 w-full h-1 line bg-white"></div>
        <button
          class="
            text-white
            rounded-full
            w-6
            text-center
            font-bold
            cursor-pointer
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
    <NuxtChild />
  </div>
</template>

<script>
export default {
  created() {
    if (!this.user) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      user: this.$cookies.get("user"),
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

  watch: {
    $route(to) {
      if (to.name === "details") {
        this.animateStep({ id: 0 });
      }
      if (to.name === "images") {
        this.animateStep({ id: 1 });
      }
      if (to.name === "location") {
        this.animateStep({ id: 2 });
      }
      if (to.name === "finalise") {
        this.animateStep({ id: 3 });
      }
    },
  },

  methods: {
    goToStep(step) {
      if (this.$store.state.isEditing === true) {
        this.$router.push(`/${step.name}`);
        this.animateStep(step);
      }
      if (step.name === "details") {
        this.$router.push(`/${step.name}`);
        this.animateStep(step);
      }
      if (step.name === "images" && this.firstStepFilled) {
        this.$router.push(`/${step.name}`);
        this.animateStep(step);
      }
      if (step.name === "location" && this.$store.state.selectedImages.length) {
        this.$router.push(`/${step.name}`);
        this.animateStep(step);
      }
      if (step.name === "finalise" && this.latLongFilled) {
        this.$router.push(`/${step.name}`);
        this.animateStep(step);
      }
    },
    animateStep(step) {
      this.activeStep = step.id;
      this.$gsap.to(".line", {
        transformOrigin: "left",
        scaleX: step.id / (this.steps.length - 1),
        backgroundColor: "rgb(209 213 219)",
      });
    },
  },
  computed: {
    firstStepFilled() {
      return this.$store.getters.firstStepFilled;
    },
    latLongFilled() {
      return this.$store.getters.latLongFilled;
    },
  },
};
</script>

<style>
</style>