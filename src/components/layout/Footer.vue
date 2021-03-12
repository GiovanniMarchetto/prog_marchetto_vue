<template>
  <footer>
    <p>
      Questa piattaforma si basa su 
      <a
        href="https://cloud.google.com/appengine?hl=it"
        target="_blank"
        rel="noopener"
        >Google App Engine</a
      >.
    </p>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
footer {
  margin-top: 20px;
  padding: 10px;
  color: #fff;
  background: #343a40;
}

a {
  color: aquamarine;
}
</style>
