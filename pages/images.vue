<template>
  <div>
    <div
      class="
        flex
        mx-6
        md:mx-20
        lg:mx-48
        space-x-4
        sm:space-x-8
        md:space-x-10
        lg:space-x-20
      "
    >
      <div class="w-1/2">
        <h3 class="text-xs uppercase mb-2">Image Bank</h3>

        <ImageGrid
          :images="images"
          @imageClick="selectImage"
          cameraName="camera name"
          roverText="rover text"
        />

        <div class="md:hidden">
          <NuxtLink to="/details">
            <button class="btn-primary w-full bg-black my-4">Back</button>
          </NuxtLink>
        </div>
      </div>
      <div class="w-1/2">
        <h3 class="text-xs uppercase mb-2">Selected Images</h3>
        <ImageGrid :images="selectedImages" @imageClick="removeImage" />
        <button
          @click="checkImages"
          class="btn-primary bg-black my-4 w-full md:w-auto"
        >
          Next step
        </button>

        <div v-if="errors.length">
          <p class="text-red-500" v-for="error in errors" :key="error.id">
            {{ error }}
          </p>
        </div>
      </div>
    </div>
    <div class="hidden md:inline absolute left-10 bottom-10">
      <NuxtLink to="/details" class="btn-link bg-black">Back</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  layout: "flow",

  middleware({ store, redirect }) {
    if (
      store.state.missionName === "" ||
      store.state.missionDesc == "" ||
      store.state.missionDate == null
    ) {
      return redirect("/details");
    }
  },
  data() {
    return {
      images: [],
      errors: [],
    };
  },
  async fetch() {
    const data = await fetch(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=33FwE0MvWwZSp4zdEjnccK2wfLGQ6CaMwZtL6P8f&sol=15"
    ).then((res) => res.json());
    this.images = data.photos.map((image, index) => {
      return index % 2 === 0
        ? {
            ...image,
            cameraName: image.camera.name,
            roverText: image.rover.status,
          }
        : {
            ...image,
            cameraName: image.camera.name,
            roverText: image.rover.name,
          };
    });
  },
  methods: {
    selectImage({ image }) {
      this.selectedImages = [...this.selectedImages, image];
    },

    removeImage({ image }) {
      this.selectedImages = this.selectedImages.filter(
        (selectedImage) => selectedImage.img_src !== image.img_src
      );
    },
    checkImages() {
      this.errors = [];
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