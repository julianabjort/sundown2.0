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
        <p
          @click="
            goToStep('details');
            goToDetails();
          "
          class="
            text-white
            rounded-full
            w-6
            text-center
            font-bold
            cursor-pointer
          "
          :class="isDetailsPage ? 'bg-indigo-500' : 'bg-gray-300'"
        >
          1
        </p>

        <p
          @click="
            goToStep('images');
            goToImages();
          "
          class="
            text-white
            rounded-full
            w-6
            text-center
            font-bold
            cursor-pointer
          "
          :class="isImagesPage ? 'bg-indigo-500' : 'bg-gray-300'"
        >
          2
        </p>
        <p
          @click="
            goToStep('location');
            goToLocation();
          "
          class="
            text-white
            rounded-full
            w-6
            text-center
            font-bold
            cursor-pointer
          "
          :class="isLocationPage ? 'bg-indigo-500' : 'bg-gray-300'"
        >
          3
        </p>
        <p
          @click="goToStep('finalise')"
          class="
            text-white
            rounded-full
            w-6
            text-center
            font-bold
            cursor-pointer
          "
          :class="isFinalPage ? 'bg-indigo-500' : 'bg-gray-300'"
        >
          4
        </p>
      </div>
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
      // all animations from step 1
      if (to.name === "images" && from.name === "details") {
        this.animateForward(".line", 0, 0.33);
      }
      if (to.name === "location" && from.name === "details") {
        this.animateForward(".line", 0, 0.66);
      }
      if (to.name === "finalise" && from.name === "details") {
        this.animateForward(".line", 0, 1);
      }
      //   // all animations from step 2
      if (to.name === "details" && from.name === "images") {
        this.animateBackward(".line", 0.33, 0);
      }
      if (to.name === "location" && from.name === "images") {
        this.animateForward(".line", 0.33, 0.66);
      }
      if (to.name === "finalise" && from.name === "images") {
        this.animateForward(".line", 0.33, 1);
      }
      //   // all animations from step 3
      if (to.name === "images" && from.name === "location") {
        this.animateBackward(".line", 0.66, 0.33);
      }
      if (to.name === "details" && from.name === "location") {
        this.animateBackward(".line", 0.66, 0);
      }
      if (to.name === "finalise" && from.name === "location") {
        this.animateForward(".line", 0.66, 1);
      }
      // all animation from step 4
      if (to.name === "location" && from.name === "finalise") {
        this.animateBackward(".line", 1, 0.66);
      }
      if (to.name === "images" && from.name === "finalise") {
        this.animateBackward(".line", 1, 0.33);
      }
      if (to.name === "details" && from.name === "finalise") {
        this.animateBackward(".line", 1, 0);
      }
    },
  },
  methods: {
    animateForward(line, from, to) {
      this.$gsap.fromTo(
        line,
        { scaleX: from, transformOrigin: "left" },
        {
          duration: 2,
          scaleX: to,
          ease: "expo",
          backgroundColor: "rgb(209 213 219)",
        }
      );
    },
    animateBackward(line, from, to) {
      this.$gsap.fromTo(
        line,
        {
          scaleX: from,
          transformOrigin: "left",
          backgroundColor: "rgb(209 213 219)",
        },
        {
          duration: 2,
          scaleX: to,
          ease: "expo",
          backgroundColor: "rgb(209 213 219)",
        }
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

