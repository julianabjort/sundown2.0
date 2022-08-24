<template>
<div>
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
            <button class="btn-primary">+ Create new Space report</button>
            <h3 class="heading-3">Fun space facts</h3>
            <p>There is so much about space, our solar system, and the galaxy that we still don't know!  Space is vast. With billions of galaxies and stars, and planets in our own solar system yet to be fully explored or understood, scientists' knowledge of space is always evolving.  There are, however, some really cool things we know about space right now!  We've compiled a list of what we think are ten stellar facts that we hope you'll think are out of this world!</p>
        </div>
    </div>
</div>
</template>

<script>
export default {

data() {
    return {
    user: this.$cookies.get('user')
    }
  },
methods: { 

},
   
computed: {
    fullName() {
      return this.user.first_name + " " + this.user.last_name
    }, 
  }
}

</script>
