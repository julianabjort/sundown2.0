<template>
  <div>
    <div class="relative" v-if="user">
      <div class="text-center my-10">
        <div class="flex items-center justify-center">
          <h1 class="heading-1 mr-2">MRT™</h1>
          <img src="../assets/images/logo.png" class="w-auto h-10" alt="logo" />
        </div>
        <h1 class="heading-2">Hi {{ fullName }}</h1>
      </div>
      <div class="md:flex mx-6 md:mx-20 lg:mx-48 md:space-x-20">
        <div class="md:w-1/2">
          <h2 class="heading-2">Space reports by {{ user.username }}</h2>
          <div class="w-full h-auto md:h-96 border-2 rounded-md overflow-auto">
            <div v-for="report in userReports" :key="report.id">
              <div
                v-if="report.userId == user.id"
                class="
                  flex
                  bg-black
                  rounded-md
                  m-1
                  py-3
                  px-3
                  justify-between
                  items-center
                "
              >
                <h3 class="heading-3 text-white">{{ report.missionName }}</h3>

                <div class="flex space-x-2">
                  <NuxtLink to="/details">
                    <button
                      @click="
                        editReport(
                          report.userId,
                          report.missionName,
                          report.missionDesc,
                          report.missionDate,
                          report.missionLat,
                          report.missionLong,
                          report.selectedImages,
                          report.reportId
                        )
                      "
                      class="btn-primary bg-blue-500"
                    >
                      Edit
                    </button>
                  </NuxtLink>
                  <button
                    @click="deleteReport(report.reportId)"
                    class="btn-primary bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="md:w-1/2">
          <button
            @click="resetState"
            class="btn-link bg-black w-full md:w-auto my-10 md:mt-16 md:mb-10"
          >
            + Create new Space report
          </button>

          <h2 class="heading-2">Fun space facts</h2>
          <p>
            There is so much about space, our solar system, and the galaxy that
            we still don't know! Space is vast. With billions of galaxies and
            stars, and planets in our own solar system yet to be fully explored
            or understood, scientists' knowledge of space is always evolving.
            There are, however, some really cool things we know about space
            right now! We've compiled a list of what we think are ten stellar
            facts that we hope you'll think are out of this world!
          </p>
        </div>
      </div>

      <span @click="logout"
        ><MdPowerIcon
          w="20px"
          h="20px"
          class="absolute -top-4 right-10 cursor-pointer"
      /></span>
    </div>
  </div>
</template>

<script>
import MdPowerIcon from "vue-ionicons/dist/md-power.vue";

export default {
  created() {
    if (!this.user) {
      this.$router.push("/");
    }
  },
  mounted() {
    let userReports = JSON.parse(localStorage.getItem("userReports"));
    this.userReports = userReports;
  },

  data() {
    return {
      user: this.$cookies.get("user"),
      userReports: [],
    };
  },

  methods: {
    logout() {
      this.$cookies.remove("user");
      this.$router.push("/");
    },
    deleteReport(id) {
      this.userReports = this.userReports.filter(
        (item) => item.reportId !== id
      );
      localStorage.setItem("userReports", JSON.stringify(this.userReports));
    },
    editReport(user, name, desc, date, lat, long, images, report) {
      this.userId = user;
      this.missionName = name;
      this.missionDesc = desc;
      this.missionDate = date;
      this.missionLat = lat;
      this.missionLong = long;
      this.selectedImages = images;
      this.reportId = report;
    },
    resetState() {
      this.$store.commit("reset");
      this.$router.push("/details");
    },
  },

  computed: {
    fullName() {
      return this.user.first_name + " " + this.user.last_name;
    },
    userId: {
      get() {
        return this.$store.state.userId;
      },
      set(value) {
        this.$store.commit("setUserId", { userId: value });
      },
    },
    reportId: {
      get() {
        return this.$store.state.reportId;
      },
      set(value) {
        this.$store.commit("setReportId", { reportId: value });
      },
    },
    missionName: {
      get() {
        return this.$store.state.missionName;
      },
      set(value) {
        this.$store.commit("setMissionName", { missionName: value });
      },
    },
    missionDesc: {
      get() {
        return this.$store.state.missionDesc;
      },
      set(value) {
        this.$store.commit("setMissionDesc", { missionDesc: value });
      },
    },
    missionDate: {
      get() {
        return this.$store.state.missionDate;
      },
      set(value) {
        this.$store.commit("setMissionDate", { missionDate: value });
      },
    },
    selectedImages: {
      get() {
        return this.$store.state.selectedImages;
      },
      set(value) {
        if (this.selectedImages.length < 7) {
          this.$store.commit("setSelectedImages", { selectedImages: value });
        }
      },
    },
    missionLat: {
      get() {
        return this.$store.state.missionLat;
      },
      set(value) {
        this.$store.commit("setMissionLat", { missionLat: value });
      },
    },
    missionLong: {
      get() {
        return this.$store.state.missionLong;
      },
      set(value) {
        this.$store.commit("setMissionLong", { missionLong: value });
      },
    },
  },
  components: {
    MdPowerIcon,
  },
};
</script>
