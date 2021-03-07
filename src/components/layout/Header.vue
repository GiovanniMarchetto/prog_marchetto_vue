<template>
  <header>
    <!-- <img alt="Vue logo" src="@/assets/logo.png" /> -->

    <div id="nav">
      <router-link to="/">Home/Login</router-link> |
      <router-link to="/administrator-page">Administrator</router-link> |
      <router-link to="/uploader-page">Uploader</router-link> |
      <router-link to="/consumer-page">Consumer</router-link>
    </div>

    <!-- <p>{{this.$route.path}}</p> -->
  </header>
</template>

<script>
export default {
  name: "Header",
  components: {
  },
};
</script>

<style scoped>
#nav {
  padding: 30px;
  background: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
/* img {
  display: flex;

  width: 10%;
} */
</style>
