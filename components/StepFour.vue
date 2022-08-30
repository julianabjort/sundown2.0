<template>

<div>
    <div class="text-center my-10">
        <h1 class="heading-1">MRT</h1>
    </div>

     <div class="flex mx-48 space-x-20">
        <div class="w-1/2">
            <div class="w-full h-auto">
                <h3 class="heading-3">User ID</h3>
                <p>{{ report.userId }}</p>
                
                <h3 class="heading-3">Mission Name</h3>
                <p>{{ report.missionName }}</p>

                <h3 class="heading-3">Mission Description</h3>
                <p>{{ report.missionDesc }}</p>

                <h3 class="heading-3">Mission Start Date</h3>
                <p>{{ report.missionDate }}</p>

                <h3 class="heading-3">Lat</h3>
                <p>{{ report.missionLat }}</p>
                
                <h3 class="heading-3">Long</h3>
                <p>{{ report.missionLong }}</p>
            </div>
        </div>
        <div class="w-1/2">
    
            <div class="w-full h-auto flex flex-wrap justify-around overflow-auto">
                <div v-for="image in report.selectedImages" :key="image.id">
                    <img
                    class="rounded-sm h-36 w-36 m-1" 
                    :src="image" alt=""
                    v-lazy-load
                    >
                </div>
        </div>
        <button @click="finaliseReport" class="btn-primary bg-black">Finalise Report</button>
    </div>
    
</div>
</div>
  
</template>
<script>

export default {
    methods: {
        finaliseReport() {
            let userReports = JSON.parse(localStorage.getItem("userReports"));
            if(userReports == null) userReports = [];
            userReports.push(this.report)
            localStorage.setItem('userReports', JSON.stringify(userReports))
            this.$router.push('/dashboard');
        }
    },
    computed: {
        report: {
            get() {
                return this.$store.state
            },
        },
}
}
</script>