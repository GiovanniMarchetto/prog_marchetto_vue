<template>
  <footer>
    <p>
      I sorgenti del progetto sono disponibili su GtHub: 
      <a href="https://github.com/GiovanniMarchetto/ProgettoMarchetto"
        >backend</a
      >
      e 
      <a href="https://github.com/GiovanniMarchetto/prog_marchetto_vue"
        >frontend</a
      >.
    </p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
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
