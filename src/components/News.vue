<template>
  <section id="news-carousel">
    <div id="items">
      <article v-for="(item, index) in items" :id="'item-' + index">
        <p>{{ item }}</p>
      </article>
    </div>
  </section>
</template>

<script>
import gsap from "gsap";
export default {
  props: {
    currentItem: Number,
    lastItem: Number,
    items: Array,
    smiling: Boolean,
  },
  watch: {
    currentItem() {
      gsap.fromTo(
        "#item-" + this.lastItem,
        {
          x: 0,
          opacity: 1,
        },
        {
          x: -50,
          opacity: 0,
        }
      );
      gsap.fromTo(
        "#item-" + this.currentItem,
        {
          x: 50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
        }
      );
    },
    smiling() {
      if (this.smiling) {
        gsap.to("#item-" + this.currentItem, {
          y: -50,
        });
        gsap.to("#item-" + this.currentItem, {
          y: 0,
          delay: 0.5,
        });
      }
    },
  },
};
</script>

<style scoped>
article {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  color: #222;
  font-size: 10vw;
}
article:nth-of-type(1) {
  background: rgb(255, 196, 196);
  opacity: 1;
}
article:nth-of-type(2) {
  background: rgb(189, 189, 255);
}
article:nth-of-type(3) {
  background: rgb(182, 255, 182);
}
article:nth-of-type(4) {
  background: rgb(255, 217, 168);
}
article:nth-of-type(5) {
  background: rgb(148, 207, 255);
}
</style>
