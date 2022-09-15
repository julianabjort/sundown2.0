<template>
  <div>
    <div
      class="flex mx-6 md:mx-20 lg:mx-48 space-x-4 sm:space-x-8 md:space-x-10 lg:space-x-20"
    >
      <div class="w-1/2">
        <h3 class="text-xs uppercase mb-2">Image Bank</h3>
        <div class="h-[500px] md:h-96 border-2 rounded-md overflow-auto">
          <div
            class="w-full h-auto p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 grid-rows-auto mb-4"
          >
            <p v-if="$fetchState.pending">Fetching images...</p>
            <p v-else-if="$fetchState.error">An error occurred :(</p>

            <div
              v-else
              v-for="(image, index) in images.photos"
              :key="image.title"
              class="w-full relative"
            >
              <img
                class="rounded-md aspect-square w-full cursor-pointer object-cover"
                :src="image.img_src"
                alt=""
                @click="
                  selectImage(
                    image.img_src,
                    image.camera.name,
                    image.rover.name,
                    image.rover.status,
                    index
                  )
                "
              />
              <p
                v-if="index % 2 === 0"
                class="absolute bottom-1 left-1 text-xs text-white"
              >
                {{ image.camera.name }} -
                {{ image.rover.status }}
              </p>
              <p v-else class="absolute bottom-1 left-1 text-xs text-white">
                {{ image.camera.name }} -
                {{ image.rover.name }}
              </p>
            </div>
          </div>
        </div>

        <div class="md:hidden">
          <NuxtLink to="/details">
            <button class="btn-primary w-full bg-black my-4">Back</button>
          </NuxtLink>
        </div>
      </div>
      <div class="w-1/2">
        <h3 class="text-xs uppercase mb-2">Selected Images</h3>
        <div class="h-[500px] md:h-96 border-2 rounded-md overflow-auto">
          <div
            class="w-full h-auto p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 grid-rows-auto mb-4"
          >
            <div
              v-for="image in selectedImages"
              :key="image.id"
              class="w-full relative"
            >
              <p class="absolute bottom-1 left-1 text-xs text-white">
                {{ image.cameraName }} -
                {{ image.roverText }}
              </p>

              <img
                class="rounded-md w-full cursor-pointer object-cover aspect-square"
                :src="image.img"
                alt=""
                @click="removeImage(image.img)"
              />
            </div>
          </div>
        </div>
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
  layout: "TestLayout",

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
    this.images = await fetch(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=33FwE0MvWwZSp4zdEjnccK2wfLGQ6CaMwZtL6P8f&sol=15"
    ).then((res) => res.json());
  },
  methods: {
    selectImage(img, cameraName, roverName, roverStatus, index) {
      // const selected = this.selectedImages.find((image) => image.img === img);
      // console.log(selected);

      const roverText = index % 2 === 0 ? roverStatus : roverName;
      this.selectedImages = [
        ...this.selectedImages,
        {
          img,
          cameraName,
          roverText,
        },
      ];
    },
    removeImage(img) {
      this.selectedImages = this.selectedImages.filter(
        (image) => image.img !== img
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
