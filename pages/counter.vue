<template>
  <div>
    <h1 class="text-3xl font-bold">
      Counter
      {{ fullName }}
    </h1>
    <div>
      <p class="text-2xl font-bold my-4">{{ counter }}</p>
      <button @click="increment" class="px-4 py-2 bg-purple-300 rounded-full">Increment</button>
      <button @click="decrement" class="px-4 py-2 bg-purple-300 rounded-full">Decrement</button>
    </div>
    <ul>
      <li v-for="user in users" :key="user.id">
         {{user.first_name}}
       </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import users from "../assets/data/users.json";

export default {
  data() {
    return {
      firstName: 'Juliana',
      lastName: 'Ivarsdottir',
      users
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment', 10)
    },
    decrement() {
      this.$store.commit('decrement', 10)
    }
  },
  computed: {
    fullName() {
      return this.firstName + this.lastName
    }, 
    ...mapGetters([
      'counter',
    ])
  }

}

</script>
