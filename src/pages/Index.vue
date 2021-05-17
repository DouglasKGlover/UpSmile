<template>
  <Layout>
    <main id="home">
      <ClientOnly>
        <SmileDetect
          v-on:looking-left="prevItem"
          v-on:looking-right="nextItem"
          v-on:smiling="setSmiling"
        />
        <News :items="items" :currentItem="currentItem" :lastItem="lastItem" />
      </ClientOnly>
      <SmileDisplay :smiling="smiling" />
    </main>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      currentItem: 0,
      lastItem: 0,
      smiling: false,
      items: [],
    };
  },
  methods: {
    getNewsItems() {
      const _self = this;
      fetch("https://www.reddit.com/r/UpliftingNews/top/.json")
        .then((response) => response.json())
        .then((data) => {
          data.data.children.forEach((e) => {
            const thisData = e.data;
            const thisNewsItem = {
              title: thisData.title,
              redditUrl: thisData.permalink,
              originalUrl: thisData.url,
              domain: thisData.domain,
              thumbnail: thisData.thumbnail,
            };
            _self.items.push(thisNewsItem);
          });
        });
    },
    updateItem(num) {
      const totalItems = this.items.length;
      this.lastItem = this.currentItem;

      if (num < 0) {
        this.currentItem = totalItems - 1;
        return;
      }

      if (num >= totalItems) {
        this.currentItem = 0;
        return;
      }

      this.currentItem = num;
    },
    nextItem() {
      this.updateItem(this.currentItem + 1);
    },
    prevItem() {
      this.updateItem(this.currentItem - 1);
    },
    setSmiling() {
      this.smiling = true;
      setTimeout(() => {
        this.smiling = false;
      }, 500);
    },
  },
  mounted() {
    this.getNewsItems();
  },
};
</script>

<style></style>
