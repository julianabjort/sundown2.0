<template>
  <div>
    <div class="md:flex mx-6 md:mx-20 lg:mx-48 md:space-x-10 lg:space-x-20">
      <div class="flex flex-col md:w-1/2 space-y-2">
        <label for="name" class="text-xs uppercase mt-2">Mission Name</label>
        <input
          id="name"
          :value="missionName"
          @input="update($event, 'missionName')"
          name="name"
          type="text"
          class="border-[0.5px] border-black rounded-md pl-2"
          placeholder="Mission Name"
        />
        <label for="name" class="text-xs uppercase mt-2"
          >Mission Description</label
        >
        <textarea
          id="description"
          :value="missionDesc"
          @input="update($event, 'missionDesc')"
          cols="30"
          rows="10"
          name="description"
          type="text"
          class="border-[0.5px] border-black rounded-md pl-2"
          placeholder="Mission Description"
        ></textarea>
      </div>
      <div class="md:w-1/2">
        <p class="text-xs uppercase my-2">Mission start date:</p>
        <div class="mb-4">
          <date-picker v-model="missionDate" type="date"></date-picker>
        </div>

        <div class="flex space-x-4 md:space-x-0">
          <div class="md:hidden w-1/2">
            <NuxtLink to="/dashboard">
              <button class="btn-primary w-full bg-black">Close</button>
            </NuxtLink>
          </div>

          <button
            @click="checkInputs"
            class="btn-primary w-1/2 md:w-auto bg-black"
          >
            Next step
          </button>
        </div>

        <div v-if="errors.length">
          <p class="text-red-500 mt-2" v-for="error in errors" :key="error.id">
            {{ error }}
          </p>
        </div>
      </div>
    </div>

    <div class="hidden md:inline absolute left-10 bottom-10">
      <NuxtLink to="/dashboard" class="btn-link bg-black">Close</NuxtLink>
    </div>
  </div>
</template>
<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { mapGetters } from "vuex";

export default {
  components: { DatePicker },
  layout: "FlowLayout",

  created() {
    if (this.userId === null || this.reportId === "") {
      this.userId = this.user.id;
      this.reportId = Math.random().toString(16).slice(2);
      this.missionDate = new Date();
    } else {
      this.missionDate = new Date(this.missionDate);
    }
  },

  data() {
    return {
      user: this.$cookies.get("user"),
      errors: [],
    };
  },

  methods: {
    checkInputs() {
      this.errors = [];
      if (this.missionName && this.missionDesc && this.missionDate) {
        this.$router.push("/images");
      } else {
        this.errors.push("All fields are required.");
      }
    },
    update(e, type) {
      const payload = {
        key: type,
        value: e.target.value,
      };
      this.$store.commit("set", payload);
    },
  },

  computed: {
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
    missionDate: {
      get() {
        return this.$store.state.missionDate;
      },
      set(value) {
        this.$store.commit("setMissionDate", { missionDate: value });
      },
    },
    ...mapGetters(["missionName", "missionDesc"]),
  },
};
</script>