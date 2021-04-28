<template>
  <Layout>
    <div id="home">
      <h1>Home</h1>

      <ClientOnly>
        <SmileDetect />
      </ClientOnly>
    </div>
  </Layout>
</template>

<script>
export default {};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
