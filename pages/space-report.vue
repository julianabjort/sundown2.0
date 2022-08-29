<template>
<div>
    <component :is="component">
      <button @click="goBack" class="btn-primary" name="backButton">Back</button>
      <button @click="toggleComponents" class="btn-primary" name="nextButton">Next step</button>
    </component>
</div>
</template>

<script>
export default {
  data() {
    return {
      component: 'StepOne',
    }
  },
methods: {
    toggleComponents() {
        if (this.component === 'StepOne') {
        this.component = 'StepTwo'
    }   else if (this.component === 'StepTwo') {
        this.component = 'StepThree'
    }   else if (this.component === 'StepThree') {
        this.component = 'StepFour'
    }   else {
        this.component = 'StepOne'
      }
    },
    goBack() {
    if (this.component === 'StepOne') {
        this.$router.push('/dashboard');
    }   else if (this.component === 'StepTwo') {
        this.component = 'StepOne'
    }   else if (this.component === 'StepThree') {
        this.component = 'StepTwo'
    }   else {
        this.component = 'StepFour'
      }
  }
  },
  
}
  
</script>