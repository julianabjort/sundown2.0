<template>
  <div class="flex justify-center align-center">
    <div class="flex flex-col w-48">

      <h1 class="text-3xl font-bold text-center">MRT</h1>

      <form id="login" action="">

        <p v-if="errors.length">
        <ul>
          <li class="text-red-500" v-for="error in errors" :key="error.id">{{ error }}</li>
        </ul>
      </p>
        <label for="email" class="text-xs uppercase mt-2">E-mail</label>

        <input id="email" name="email" type="text" v-model="input.email" class="border-[0.5px] border-black rounded-md pl-2" placeholder="E-mail">
        
        <label for="password" class="text-xs uppercase mt-2">Password</label>

        <input type="password" id="password" name="password" v-model="input.password" class="border-[0.5px] border-black rounded-md pl-2" placeholder="Password">

        <button @click.prevent="login" class="btn-primary">Login</button>
      </form>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import users from "../assets/data/users.json";

export default {
  
  data() {
    return {
      errors: [],
      users,
      input: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.checkForm()
  
      for (let i = 0; i < users.length; i++) {
          if(this.input.email == users[i].email && this.input.password == users[i].password)  {
              this.$cookies.set('user', this.users[i])
              this.$router.push('/dashboard');
          }
      }      
  },
    checkForm() {
      this.errors = [];

      if (this.input.email && this.input.password) {
        return true;
      }
      if (!this.input.email) {
        this.errors.push('Email required.');
      }
      if (!this.input.password) {
        this.errors.push('Password required.');
      }
  },
  },
}

</script>
