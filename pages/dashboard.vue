<template>
  <div v-if="user" class="relative">
    <Modal :show="showModal" @close="showModal = false">
      <h1 class="heading-bold">Delete report</h1>
      <h2 class="mb-4">Are you sure you want to delete this report?</h2>
      <button
        @click="showModal = false"
        class="btn-secondary border-2 border-red-500 text-red-500"
      >
        Cancel
      </button>
      <button
        @click="
          deleteReport(deleteReportId);
          showModal = false;
        "
        class="btn-primary bg-red-500 border-2 border-red-500"
      >
        Delete
      </button>
    </Modal>
    <div class="flex items-center justify-center pt-6">
      <h1 class="heading-1 mr-2">MRT™</h1>
      <img src="../assets/images/logo.png" class="w-auto h-10" alt="logo" />
    </div>
    <h1 class="heading-2 text-center">Hi {{ fullName }}</h1>

    <div class="md:flex mx-6 md:mx-20 lg:mx-48 md:space-x-20">
      <div class="md:w-1/2">
        <h2 class="heading-2">Space reports by {{ user.username }}</h2>
        <div
          class="
            w-full
            h-auto
            md:h-96
            border-2 border-gray-100
            rounded-md
            overflow-auto
          "
        >
          <div
            class="relative"
            v-for="report in sortedReports"
            :key="report.id"
          >
            <div
              v-if="report.userId == user.id"
              class="
                group
                flex
                bg-gray-100
                rounded-md
                m-2
                py-4
                px-3
                justify-between
                items-center
                shadow-sm
                hover:bg-gray-200
                cursor-default
              "
            >
              <div class="flex">
                <img
                  :src="report.selectedImages[0].img_src"
                  class="hidden sm:block w-12 h-12 object-cover rounded-md"
                  alt="report-img"
                />
                <div class="ml-2 md:ml-4">
                  <h3 class="font-bold text-gray-700">
                    {{ report.missionName }}
                  </h3>
                  <div class="text-xs flex">
                    <p>{{ report.missionDesc.slice(0, 34) }}..</p>
                    <p class="group-hover:hidden hidden lg:block">
                      ・ {{ getFormattedDate(report.missionDate) }}
                    </p>
                  </div>
                </div>
              </div>
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
                        report.reportId,
                        report.isEditing
                      )
                    "
                    class="
                      md:hidden md:group-hover:block
                      btn-primary
                      bg-blue-500
                    "
                  >
                    Edit
                  </button>
                </NuxtLink>
                <button
                  @click="
                    setDeleteReportId(report.reportId);
                    showModal = true;
                  "
                  class="md:hidden md:group-hover:block btn-primary bg-red-500"
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
          There is so much about space, our solar system, and the galaxy that we
          still don't know! Space is vast. With billions of galaxies and stars,
          and planets in our own solar system yet to be fully explored or
          understood, scientists' knowledge of space is always evolving. There
          are, however, some really cool things we know about space right now!
          We've compiled a list of what we think are ten stellar facts that we
          hope you'll think are out of this world!
        </p>
      </div>
    </div>

    <span @click="logout"
      ><MdPowerIcon
        w="20px"
        h="20px"
        class="absolute top-6 right-10 cursor-pointer"
    /></span>
  </div>
</template>

<script>
import MdPowerIcon from "vue-ionicons/dist/md-power.vue";
import moment from "moment";

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
      deleteReportId: "",
      showModal: false,
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
    setDeleteReportId(id) {
      this.deleteReportId = id;
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
      this.isEditing = true;
    },
    resetState() {
      this.$store.commit("reset");
      this.$router.push("/details");
    },
    getFormattedDate(date) {
      return moment(date).format("MMM D");
    },
  },

  computed: {
    fullName() {
      return this.user.first_name + " " + this.user.last_name;
    },
    sortedReports() {
      this.userReports.sort((a, b) => {
        return new Date(b.missionDate) - new Date(a.missionDate);
      });

      return this.userReports;
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
    isEditing: {
      get() {
        return this.$store.state.isEditing;
      },
      set(value) {
        this.$store.commit("setIsEditing", { isEditing: value });
      },
    },
  },
  components: {
    MdPowerIcon,
  },
};
</script>
