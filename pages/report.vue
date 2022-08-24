<template>
<div>
    <div class="text-center my-10">
        <h1 class="heading-1">MRT</h1>
    </div>
    <div class="flex mx-48 space-x-20">
        <div class="flex flex-col w-1/2 space-y-2">
            <label for="name" class="text-xs uppercase mt-2">Mission Name</label>
            <input id="name" name="name" type="text" class="border-[0.5px] border-black rounded-md pl-2" placeholder="Mission Name">
            <label for="name" class="text-xs uppercase mt-2">Mission Description</label>
            <textarea id="description" cols="30" rows="10" name="description" type="text" class="border-[0.5px] border-black rounded-md pl-2" placeholder="Mission Description"></textarea>
            
        </div>
        <div class="w-1/2">
            <p>Mission start date:</p>
            <div>
                
                <date-picker v-model="date" type="date"></date-picker>
                
            </div>
           <button class="btn-primary">Next step</button>
        </div>
    </div>
    </div>
    

</template>

<script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

  export default {
    components: { DatePicker },
    data() {
      return {
        date: null,
      };
    },
  };
</script>