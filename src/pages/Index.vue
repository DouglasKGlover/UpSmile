<template>
  <Layout>
    <main id="home">
      <ClientOnly>
        <SmileDetect
          v-on:looking-left="prevItem"
          v-on:looking-right="nextItem"
          v-on:smiling="setSmiling"
        />
        <News
          :items="items"
          :currentItem="currentItem"
          :lastItem="lastItem"
          :smiling="smiling"
        />
      </ClientOnly>
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
      items: [1, 2, 3, 4, 5],
    };
  },
  methods: {
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
};
</script>

<style></style>
