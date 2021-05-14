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
      console.table(this.currentItem, this.lastItem);
      gsap.to("#item-" + this.lastItem, {
        opacity: 0,
      });
      gsap.to("#item-" + this.currentItem, {
        opacity: 1,
      });
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

<style>
article {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 500px;
  height: 100px;
  opacity: 0;
  color: white;
  font-size: 2em;
}
article:nth-of-type(1) {
  background: red;
  opacity: 1;
}
article:nth-of-type(2) {
  background: blue;
}
article:nth-of-type(3) {
  background: green;
}
article:nth-of-type(4) {
  background: pink;
}
article:nth-of-type(5) {
  background: purple;
}
</style>
