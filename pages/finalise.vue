<template>
  <div>
    <div class="mx-6 md:flex md:mx-48 md:space-x-20">
      <div class="md:w-1/3">
        <div class="w-full h-auto mb-4">
          <h3 class="heading-bold">Mission Name</h3>
          <p>{{ missionName }}</p>

          <h3 class="heading-bold">Mission Description</h3>
          <p>{{ missionDesc }}</p>

          <h3 class="heading-bold">Mission Start Date</h3>
          <p>{{ getFormattedDate(missionDate) }}</p>

          <h3 class="heading-bold">Lat</h3>
          <p>{{ missionLat }}</p>

          <h3 class="heading-bold">Long</h3>
          <p>{{ missionLong }}</p>
        </div>
      </div>
      <div class="md:w-1/2">
        <ImageGrid
          :images="selectedImages"
          cameraName="camera name"
          roverText="rover text"
        />
        <div class="flex space-x-4">
          <div class="md:hidden w-1/2">
            <NuxtLink to="/location">
              <button class="btn-primary w-full bg-black mt-4">Back</button>
            </NuxtLink>
          </div>

          <button
            @click="finaliseReport"
            class="btn-primary w-1/2 mt-4 md:w-auto bg-black"
          >
            Finalise Report
          </button>
        </div>

        <div v-if="errors">
          <p class="text-red-500" v-for="error in errors" :key="error.id">
            {{ error }}
          </p>
        </div>
      </div>
    </div>
    <div class="hidden md:inline absolute left-10 bottom-10">
      <NuxtLink to="/location" class="btn-link bg-black">Back</NuxtLink>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  layout: "flow",

  middleware({ store, redirect }) {
    if (
      store.state.missionName === "" ||
      store.state.missionDesc === "" ||
      store.state.missionDate === null ||
      store.state.selectedImages === [] ||
      store.state.missionDate === null ||
      store.state.missionDate === null
    ) {
      return redirect("/details");
    }
  },

  data() {
    return {
      errors: [],
    };
  },
  methods: {
    getFormattedDate(date) {
      return moment(date).format("dddd, MMMM Do YYYY");
    },

    finaliseReport() {
      this.errors = [];
      let userReports = JSON.parse(localStorage.getItem("userReports"));
      if (userReports === null) userReports = [];
      userReports = userReports.filter(
        (report) => report.reportId !== this.report.reportId
      );
      userReports.push(this.report);
      localStorage.setItem("userReports", JSON.stringify(userReports));
      this.$router.push("/dashboard");
    },
  },
  computed: {
    report: {
      get() {
        return this.$store.state;
      },
    },
    ...mapGetters([
      "missionName",
      "missionDesc",
      "missionDate",
      "missionLat",
      "missionLong",
      "selectedImages",
    ]),
  },
};
</script>