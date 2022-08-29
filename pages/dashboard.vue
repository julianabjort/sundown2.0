<template>
<div>
  <div class="relative" v-if="user">
    <div class="text-center my-10">
        <h1 class="heading-1">MRT</h1>
        <h1 class="heading-1">Hi {{ fullName }}</h1>
    </div>
    <div class="flex mx-48 space-x-20">
        <div class="w-1/2">
            <h2 class="heading-2">Space reports created by {{ user.username }}</h2>
            <div class="w-full h-96 border-2">

            </div>
        </div>
        <div class="w-1/2">
            <NuxtLink to="/space-report">
              <button class="btn-primary">+ Create new Space report</button>
            </NuxtLink>
            <h3 class="heading-3">Fun space facts</h3>
            <p>There is so much about space, our solar system, and the galaxy that we still don't know!  Space is vast. With billions of galaxies and stars, and planets in our own solar system yet to be fully explored or understood, scientists' knowledge of space is always evolving.  There are, however, some really cool things we know about space right now!  We've compiled a list of what we think are ten stellar facts that we hope you'll think are out of this world!</p>
        </div>
    </div>
    
   <span @click="logout"><MdPowerIcon w="20px" h="20px" class="absolute -top-4 right-10 cursor-pointer" /></span> 
    

  </div>
  </div>

</template>

<script>
import MdPowerIcon from 'vue-ionicons/dist/md-power.vue'

export default {
created() {
  if (!this.user) {
    this.$router.push('/');
  }
},

data() {
    return {
    user: this.$cookies.get('user')
    }
  },

methods: { 
  logout() {
    this.$cookies.remove('user')
    this.$router.push('/');
  }
},
   
computed: {
    fullName() {
      return this.user.first_name + " " + this.user.last_name
    }, 
  },

components: {
  MdPowerIcon
}
}

</script>
