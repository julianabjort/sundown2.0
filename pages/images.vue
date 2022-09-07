<template>
  <div>
    <div class="flex mx-48 space-x-20">
      <div class="w-1/2">
        <h3 class="heading-3">Space mission image bank</h3>
        <div class="h-96 border-2 rounded-md overflow-auto">
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
            <p v-if="$fetchState.pending">Fetching images...</p>
            <p v-else-if="$fetchState.error">An error occurred :(</p>

            <div
              v-else
              v-for="image in images"
              :key="image.title"
              class="w-full"
            >
              <img
                class="rounded-md h-36 w-full cursor-pointer"
                :src="image.image"
                alt=""
                @click="selectImage(image.image)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <h3 class="heading-3">Selected images to report</h3>
        <div class="h-96 border-2 rounded-md overflow-auto">
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
            <div v-for="image in selectedImages" :key="image.id" class="w-full">
              <img
                class="rounded-md h-36 w-full cursor-pointer"
                :src="image"
                alt=""
                @click="removeImage(image)"
              />
            </div>
          </div>
        </div>
        <button @click="checkImages" class="btn-primary bg-black my-4">
          Next step
        </button>

        <div v-if="errors.length">
          <p class="text-red-500" v-for="error in errors" :key="error.id">
            {{ error }}
          </p>
        </div>
      </div>
    </div>
    <div class="absolute left-10 bottom-20">
      <NuxtLink to="/details" class="btn-link bg-black">Back</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  layout: "FlowLayout",

  created() {
    if (
      this.$store.state.missionName == "" ||
      this.$store.state.missionDesc == "" ||
      this.$store.state.missionDate == ""
    ) {
      this.$router.push("/details");
    }
  },
  data() {
    return {
      images: [],
      errors: [],
    };
  },
  async fetch() {
    this.images = await fetch("https://api.nuxtjs.dev/mountains").then((res) =>
      res.json()
    );
  },
  methods: {
    selectImage(img) {
      const selected = this.selectedImages.find((image) => image === img);
      if (!selected) this.selectedImages = [...this.selectedImages, img];
    },
    removeImage(img) {
      this.selectedImages = this.selectedImages.filter(
        (image) => image !== img
      );
    },
    checkImages() {
      if (this.selectedImages.length) {
        this.$router.push("/location");
      } else {
        this.errors.push("Please select at least 1 image.");
      }
    },
  },

  computed: {
    selectedImages: {
      get() {
        return this.$store.state.selectedImages;
      },
      set(value) {
        if (this.selectedImages.length < 7) {
          this.$store.commit("setSelectedImages", { selectedImages: value });
        } else {
          this.errors = [];
          this.errors.push("Maximum 7 images allowed.");
        }
      },
    },
  },
};
</script>