<template>
  <div class="flex justify-center align-center">
    <div class="flex flex-col w-56">

      <img class="w-48 mt-16" src="../assets/images/logo.png" alt="logo">

      <h1 class="heading-1 text-center">MRT</h1>

      <form id="login" action="" novalidate="true">

        <p v-if="errors.length">
        <ul>
          <li class="text-red-500" v-for="error in errors" :key="error.id">{{ error }}</li>
        </ul>
      </p>
        <label for="email" class="text-xs uppercase mt-2">E-mail</label>

        <input id="email" name="email" type="email" v-model="input.email" class="border-[0.5px] border-black rounded-md pl-2 w-full" placeholder="E-mail">
        
        <label for="password" class="text-xs uppercase mt-2">Password</label>

        <input type="password" id="password" name="password" v-model="input.password" class="border-[0.5px] border-black rounded-md w-full pl-2 mb-4" placeholder="Password">

        <button @click.prevent="login" class="btn-primary w-full bg-black">Login</button>
      </form>
    </div>
    
  </div>
</template>

<script>
import users from "../assets/data/users.json";

export default {
  transition: "home",

  mounted() {
    if (this.user) {
      this.$router.push("/dashboard");
    }
  },

  data() {
    return {
      user: this.$cookies.get("user"),
      errors: [],
      users,
      input: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.errors = [];
      const user = users.find(
        (user) =>
          user.email === this.input.email &&
          user.password === this.input.password
      );

      if (!this.input.email || !this.input.password) {
        this.errors.push("Email and/or password required.");
      } else if (!this.validEmail(this.input.email)) {
        this.errors.push("Valid email required.");
      } else if (user == undefined) {
        this.errors.push("Wrong credentials");
      } else {
        this.$cookies.set("user", user);
        this.$router.push("/dashboard");
      }
    },
    validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>
