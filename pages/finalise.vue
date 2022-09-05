<template>
<div>
     <div class="flex mx-48 space-x-20">
        <div class="w-1/2">
            <div class="w-full h-auto">
                
                <h3 class="heading-3">Mission Name</h3>
                <p>{{ report.missionName }}</p>

                <h3 class="heading-3">Mission Description</h3>
                <p>{{ report.missionDesc }}</p>

                <h3 class="heading-3">Mission Start Date</h3>
                <p>{{ getFormattedDate(report.missionDate) }}</p>

                <h3 class="heading-3">Lat</h3>
                <p>{{ report.missionLat }}</p>
                
                <h3 class="heading-3">Long</h3>
                <p>{{ report.missionLong }}</p>
            </div>
        </div>
        <div class="w-1/2 text-center">
            <div class="h-96 border-2 rounded-md overflow-auto">
            <div class="w-full h-auto p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 grid-rows-auto mb-4">
                <div v-for="image in report.selectedImages" :key="image.id">    
                    <img class="rounded-md w-full h-36" :src="image">
                </div>
            </div>
        </div>
        <button @click="finaliseReport(); resetState()" class="btn-primary bg-black mt-4">Finalise Report</button>
    <div v-if="errors">
                <p class="text-red-500" v-for="error in errors" :key="error.id">{{ error }}</p>
            </div>
    </div>
    
</div>
<div class="absolute left-10 bottom-20">
        <NuxtLink to="/location" class="btn-primary bg-black">Back</NuxtLink>
    </div>
</div>
  
</template>
<script>
import moment from 'moment'

export default {
    layout: 'flowLayout',

    created() {
        if (this.$store.state.missionName == '' 
        || this.$store.state.missionDesc == '' 
        || this.$store.state.missionDate == null
        || this.$store.state.selectedImages == []
        || this.$store.state.missionLat == null
        || this.$store.state.missionLong == null) {
            this.$router.push('/details')
        }
    },
    data() {
        return {
            errors: []
        }
    },
    methods: {
        getFormattedDate(date) {
            return moment(date).format("dddd, MMMM Do YYYY")
        },
    
        resetState() {
            this.userId = null
            this.missionName = ''
            this.missionDesc = ''
            this.missionDate = null
            this.missionLat = null
            this.missionLong = null
            this.selectedImages = []
            this.reportId = ''
        },
        finaliseReport() {
        this.errors = [];
        if (this.userId && this.missionName && this.missionDesc && this.missionDate && this.missionLat && this.missionLong && this.selectedImages && this.reportId ) {

            let userReports = JSON.parse(localStorage.getItem("userReports"));
            if(userReports == null) userReports = [];

            for (let i = 0; i < userReports.length; i++) {
                if(this.report.reportId == userReports[i].reportId)  {
                userReports = userReports.filter(report => report.reportId !== this.report.reportId)   
                }
            }
            userReports.push(this.report)
            localStorage.setItem('userReports', JSON.stringify(userReports))
            this.$router.push('/dashboard');
        } else {
            this.errors.push('Please fill out missing fields');
        }
            
        }
    },
    computed: {
        report: {
            get() {
                return this.$store.state
            },
        },
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
        selectedImages: {
            get() {
                return this.$store.state.selectedImages
            },
            set(value) {
                if (this.selectedImages.length < 7){
                this.$store.commit('setSelectedImages', {selectedImages: value})
            }
            else {
                alert("maximum 7 images allowed")
            }
            }
        },
        missionLat: {
            get() {
                return this.$store.state.missionLat
            },
            set(value) {
                this.$store.commit('setMissionLat', {missionLat: value})
            }
        },
        missionLong: {
            get() {
                return this.$store.state.missionLong
            },
            set(value) {
                this.$store.commit('setMissionLong', {missionLong: value})
            }
        },

    },
}

</script>