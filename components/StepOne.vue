<template>
<div class="h-screen relative">
    <div class="text-center my-10">
        <h1 class="heading-1">MRT</h1>
    </div>
    <div class="flex mx-48 space-x-20">
        <div class="flex flex-col w-1/2 space-y-2">
            <label for="name" class="text-xs uppercase mt-2">Mission Name</label>
            <input id="name" v-model="missionName" name="name" type="text" class="border-[0.5px] border-black rounded-md pl-2" placeholder="Mission Name">

            <label for="name" class="text-xs uppercase mt-2">Mission Description</label>
            <textarea id="description" v-model="missionDesc" cols="30" rows="10" name="description" type="text" class="border-[0.5px] border-black rounded-md pl-2" placeholder="Mission Description"></textarea>
            
        </div>
        <div class="w-1/2">
            <p>Mission start date:</p>
            <div>
                <date-picker v-model="missionDate" type="date"></date-picker>
            </div>
           <slot name="nextButton"/>
        </div>
    </div>

    <div class="absolute left-10 bottom-20">
        <slot @click.native="saveInfo(missionName, missionDesc, missionDate);" name="backButton"/>
    </div>
</div>
    

</template>

<script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

  export default {
    components: { DatePicker },
    
    methods: {
        saveInfo(name, desc, date) {
            this.missionName = name
            this.missionDesc = desc
            this.missionDate = date
        }, 
    },

    computed: {
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