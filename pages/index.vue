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

        <input id="email" name="email" type="email" v-model="input.email" class="border-[0.5px] border-black rounded-md pl-2" placeholder="E-mail">
        
        <label for="password" class="text-xs uppercase mt-2">Password</label>

        <input type="password" id="password" name="password" v-model="input.password" class="border-[0.5px] border-black rounded-md pl-2" placeholder="Password">

        <button @click.prevent="login" class="btn-primary bg-black">Login</button>
      </form>
    </div>
    
  </div>
</template>

<script>
import users from "../assets/data/users.json";

export default { 
  mounted() {
    if (this.user) {
    this.$router.push('/dashboard');
  } 
  },

  data() {
    return {
      user: this.$cookies.get('user'),
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
      this.errors = [];
  
      for (let i = 0; i < users.length; i++) {
          if(this.input.email == users[i].email && this.input.password == users[i].password)  {
            this.$cookies.set('user', this.users[i])
            this.$router.push('/dashboard');
            console.log(this.users[i])
          } else if((this.input.email !== users[i].email)){
            this.errors.push('Email does not exist.');
            this.errors.splice(1)
          } else if((this.input.email == users[i].email && this.input.password !== users[i].password)){
            this.errors.push('Wrong password.');
            this.errors.splice(1)
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
