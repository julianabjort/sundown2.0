<template>
  <div>
    <div class="flex mx-48 space-x-20">
      <div class="w-1/2">
        <div class="w-full h-auto">
          <h3 class="heading-3">Mission Name</h3>
          <p>{{ missionName }}</p>

          <h3 class="heading-3">Mission Description</h3>
          <p>{{ missionDesc }}</p>

          <h3 class="heading-3">Mission Start Date</h3>
          <p>{{ getFormattedDate(missionDate) }}</p>

          <h3 class="heading-3">Lat</h3>
          <p>{{ missionLat }}</p>

          <h3 class="heading-3">Long</h3>
          <p>{{ missionLong }}</p>
        </div>
      </div>
      <div class="w-1/2 text-center">
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
            <div v-for="image in selectedImages" :key="image.id">
              <img class="rounded-md w-full h-36" :src="image" />
            </div>
          </div>
        </div>
        <button
          @click="
            finaliseReport();
            resetState();
          "
          class="btn-primary bg-black mt-4"
        >
          Finalise Report
        </button>
        <div v-if="errors">
          <p class="text-red-500" v-for="error in errors" :key="error.id">
            {{ error }}
          </p>
        </div>
      </div>
    </div>
    <div class="absolute left-10 bottom-20">
      <NuxtLink to="/location" class="btn-link bg-black">Back</NuxtLink>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  layout: "FlowLayout",

  created() {
    if (
      this.missionName == "" ||
      this.missionDesc == "" ||
      this.missionDate == null ||
      this.selectedImages == [] ||
      this.missionLat == null ||
      this.missionLong == null
    ) {
      this.$router.push("/details");
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

    resetState() {
      this.$store.commit("reset");
    },
    finaliseReport() {
      this.errors = [];
      let userReports = JSON.parse(localStorage.getItem("userReports"));
      if (userReports == null) userReports = [];
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