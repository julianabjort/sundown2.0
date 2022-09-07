<template>
  <div>
    <div class="m-20 flex items-center">
      <p
        class="bg-indigo-500 text-white rounded-full w-6 text-center font-bold"
      >
        1
      </p>
      <div class="line w-1/5 h-1 bg-black"></div>

      <p
        class="bg-indigo-500 text-white rounded-full w-6 text-center font-bold"
      >
        2
      </p>
      <div class="w-1/5 h-1 bg-black"></div>

      <p
        class="bg-indigo-500 text-white rounded-full w-6 text-center font-bold"
      >
        3
      </p>
    </div>
    <button @click="setRotationOnClick" class="ml-20 btn-primary bg-black">
      CLICK ME
    </button>
  </div>
</template>

<script>
export default {
  mounted() {
    // this.setRotationOnLoad();
  },
  methods: {
    setRotationOnClick() {
      this.$gsap.fromTo(
        ".line",
        { scaleX: 0, transformOrigin: "left" },
        { duration: 1, scaleX: 1, ease: "expo" }
      );
    },
    // setRotationOnLoad() {
    //   this.$gsap.to(".title1", { rotation: 27, x: 300, duration: 1 });
    // },
  },
};
</script>
