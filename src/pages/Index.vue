<template>
  <Layout>
    <div id="home">
      <h1>Home</h1>

      <SmileDetect />
    </div>
  </Layout>
</template>

<script>
import SmileDetect from "~/components/SmileDetect.vue";
export default {
  components: {
    SmileDetect,
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
