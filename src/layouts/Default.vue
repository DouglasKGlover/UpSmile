<template>
  <div class="layout">
    <slot />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  metaInfo: {
    titleTemplate: "UpSmile",
  },
};
</script>

<style>
html,
body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
