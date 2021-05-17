<template>
  <section id="smile-display">
    <h2>Nice!</h2>
  </section>
</template>

<script>
import gsap from "gsap";
export default {
  props: {
    smiling: Boolean,
  },
  watch: {
    smiling() {
      if (this.smiling) {
        gsap.fromTo(
          "#smile-display h2",
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: -50,
          }
        );
        gsap.to("#smile-display h2", {
          opacity: 0,
          delay: 1,
        });
      }
    },
  },
};
</script>

<style>
#smile-display {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

#smile-display h2 {
  font-size: 20vw;
  color: rgb(255, 217, 0);
  text-shadow: 5px 5px black;
  opacity: 0;
}
</style>
