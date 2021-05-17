<template>
  <section id="news-carousel">
    <div id="items">
      <article
        v-for="(item, index) in items"
        :id="'item-' + index"
        class="article"
      >
        <div class="content">
          <img :src="item.thumbnail" alt="" class="background" />
          <img :src="item.thumbnail" alt="" class="thumbnail" />
          <h1>{{ item.title }}</h1>
          <p><a :href="item.originalUrl" target="_blank">Article</a></p>
          <p>
            <a :href="'https://reddit.com' + item.redditUrl" target="_blank"
              >Reddit discussion thread</a
            >
          </p>
        </div>
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
  },
  watch: {
    currentItem() {
      document.querySelector(".active").classList.remove("active");
      document
        .querySelector("#item-" + this.currentItem)
        .classList.add("active");
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
  },
  methods: {
    checkForLoadedArticles() {
      setTimeout(() => {
        const articles = document.querySelectorAll(".article");
        if (!articles.length) {
          this.checkForLoadedArticles();
        } else {
          articles[0].classList.add("active");
        }
      }, 50);
    },
  },
  mounted() {
    this.checkForLoadedArticles();
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
  pointer-events: none;
}

article.active {
  pointer-events: all;
  opacity: 1;
}

.content {
  border: 1px solid rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.25);
  padding: 2vw;
}

.thumbnail {
  display: block;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
  opacity: 0.3;
  filter: blur(10px);
}
</style>
