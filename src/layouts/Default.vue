<template>
  <div class="layout">
    <h1>{{ $static.siteName }}</h1>
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

<style></style>
