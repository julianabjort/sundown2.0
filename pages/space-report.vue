<template>
<div>
    <component :is="component">
      <button @click="previousComponent" class="btn-primary bg-black" slot="backButton">Back</button>
      <button @click="nextComponent" class="btn-primary bg-black" slot="nextButton">Next step</button>
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
    nextComponent() {
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
    previousComponent() {
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