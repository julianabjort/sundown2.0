<template>
<div>
    <div class="flex mx-48 space-x-20">
        <div class="flex flex-col w-1/2 space-y-2">

            <label for="name" class="text-xs uppercase mt-2">Mission Name</label>
            <input id="name" v-model="missionName" name="name" type="text" class="border-[0.5px] border-black rounded-md pl-2" placeholder="Mission Name">
            <label for="name" class="text-xs uppercase mt-2">Mission Description</label>
            <textarea id="description" v-model="missionDesc" cols="30" rows="10" name="description" type="text" class="border-[0.5px] border-black rounded-md pl-2" placeholder="Mission Description"></textarea>
            
        </div>
        <div class="w-1/2">
            <p class="text-xs uppercase my-2">Mission start date:</p>
            <div class="mb-4">
                <date-picker v-model="missionDate" type="date"></date-picker>
            </div>
           <button @click="checkInputs" class="btn-primary bg-black">Next step</button>

            <div v-if="errors.length">
                <p class="text-red-500 mt-2" v-for="error in errors" :key="error.id">{{ error }}</p>
            </div>
        </div>
    </div>

    <div class="absolute left-10 bottom-10">
        <NuxtLink to="/dashboard" class="btn-primary bg-black">Close</NuxtLink>
    </div>
</div> 
</template>
<script>

  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

  export default {
    components: { DatePicker },
    layout: 'flowLayout',

    created() {
        this.userId = this.user.id
        this.reportId = Math.random().toString(16).slice(2)
    },
    data () {
        return {
            user: this.$cookies.get('user'),
            errors: [],
        }
    },

    methods: {

    checkInputs() {
      this.errors = [];

      if (this.missionName && this.missionDesc && this.missionDate) {
        this.$router.push('/images')
      }
      else {
        this.errors.push('All fields are required.');
      }
  },
    },

    computed: {
        userId: {
            get() {
                return this.$store.state.userId
            },
            set(value) {
                this.$store.commit('setUserId', {userId: value})
            },
            },
        reportId: {
            get() {
                return this.$store.state.reportId
            },
            set(value) {
                this.$store.commit('setReportId', {reportId: value})
            },
      },
        missionName: {
            get() {
                return this.$store.state.missionName
            },
            set(value) {
                this.$store.commit('setMissionName', {missionName: value})
            }
        },
        missionDesc: {
            get() {
                return this.$store.state.missionDesc
            },
            set(value) {
                this.$store.commit('setMissionDesc', {missionDesc: value})
            }
        },
        missionDate: {
            get() {
                return this.$store.state.missionDate
            },
            set(value) {
                this.$store.commit('setMissionDate', {missionDate: value})
            }
        },

    }
  };
</script>