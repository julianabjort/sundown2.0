<template>
  <div v-if="user">
    <div class="text-center my-10">
      <div class="flex items-center justify-center">
        <NuxtLink to="/dashboard" class="heading-1 mr-2">MRT™</NuxtLink>
        <img src="../assets/images/logo.png" class="w-auto h-10" alt="logo" />
      </div>
    </div>
    <div class="flex mb-10 items-center justify-center">
      <p
        @click="
          goToStep('details');
          goToDetails();
        "
        class="text-white rounded-full w-6 text-center font-bold cursor-pointer"
        :class="isDetailsPage ? 'bg-indigo-500' : 'bg-gray-300'"
      >
        1
      </p>

      <div
        class="w-1/5 h-1 line1"
        :class="
          isImagesPage || isLocationPage || isFinalPage
            ? 'bg-gray-300'
            : 'bg-white'
        "
      ></div>

      <p
        @click="
          goToStep('images');
          goToImages();
        "
        class="text-white rounded-full w-6 text-center font-bold cursor-pointer"
        :class="isImagesPage ? 'bg-indigo-500' : 'bg-gray-300'"
      >
        2
      </p>

      <div
        class="w-1/5 h-1 line2"
        :class="isLocationPage || isFinalPage ? 'bg-gray-300' : 'bg-white'"
      ></div>

      <p
        @click="
          goToStep('location');
          goToLocation();
        "
        class="text-white rounded-full w-6 text-center font-bold cursor-pointer"
        :class="isLocationPage ? 'bg-indigo-500' : 'bg-gray-300'"
      >
        3
      </p>

      <div
        class="w-1/5 h-1 line3"
        :class="isFinalPage ? 'bg-gray-300' : 'bg-white'"
      ></div>

      <p
        @click="goToStep('finalise')"
        class="text-white rounded-full w-6 text-center font-bold cursor-pointer"
        :class="isFinalPage ? 'bg-indigo-500' : 'bg-gray-300'"
      >
        4
      </p>
    </div>
    <NuxtChild />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$cookies.get("user"),
    };
  },
  created() {
    if (!this.user) {
      this.$router.push("/");
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === "images" && from.name === "details") {
        this.animateForward(".line1");
      }
      if (to.name === "location" && from.name === "images") {
        this.animateForward(".line2");
      }
      if (to.name === "finalise" && from.name === "location") {
        this.animateForward(".line3");
      }
    },
  },
  methods: {
    animateForward(line) {
      this.$gsap.fromTo(
        line,
        { scaleX: 0, transformOrigin: "left" },
        { duration: 2, scaleX: 1, ease: "expo" }
      );
    },
    goToStep(step) {
      if (this.$store.state.isEditing === true) {
        this.$router.push(`/${step}`);
      }
    },

    goToDetails() {
      if (this.$store.state.isEditing === false) {
        this.$router.push("/details");
      }
    },
    goToImages() {
      if (this.$store.state.isEditing === false) {
        if (
          this.isLocationPage ||
          this.isFinalPage ||
          (this.$store.state.missionName !== "" &&
            this.$store.state.missionDate !== "" &&
            this.$store.state.missionDesc !== null)
        ) {
          this.$router.push("/images");
        }
      }
    },
    goToLocation() {
      if (this.$store.state.isEditing === false) {
        if (
          this.isFinalPage ||
          (this.$store.state.missionName !== "" &&
            this.$store.state.missionDate !== "" &&
            this.$store.state.missionDesc !== null &&
            this.$store.state.selectedImages.length)
        ) {
          this.$router.push("/location");
        }
      }
    },
  },
  computed: {
    isDetailsPage() {
      return this.$route.path === "/details";
    },
    isImagesPage() {
      return this.$route.path === "/images";
    },
    isLocationPage() {
      return this.$route.path === "/location";
    },
    isFinalPage() {
      return this.$route.path === "/finalise";
    },
  },
};
</script>

