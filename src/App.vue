<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

header {
  padding: 10px;
  color: #fff;
  background: #343a40;
}

h2 {
  padding: 10px;
  color: #fff;
  background: #e66648;
}

h3 {
  padding: 10px;
}

form {
  padding: 10px;
  border: 1px solid #2c3e50;
  text-align: left;
  background-color: aliceblue;

  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
}

.btn {
  margin: 10px;
}
</style>
