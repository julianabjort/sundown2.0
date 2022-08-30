<template>
  <div><input v-model="value" v-on:update="changeHandler" type="text" class="border-2">
  {{ value }}
  </div>
</template>

<script>
export default {
    data() {
        return {
            value: ''
        }
    },
    methods: {
        changeHandler() {
            console.log("something")
        }
    },
    watch: {
        value() {
            console.log(this.value)
        }
    }
    // computed: {
    //     valueWrapper: {
    //         get() {
    //             return this.value
    //         },
    //         set(value) {
    //             this.value = value
    //         }
    //     }
    // }

}
</script>

<style>

</style>