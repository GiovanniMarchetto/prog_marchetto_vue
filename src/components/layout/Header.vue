<template>
  <header>
    <Logout v-show="!this.$route.path.endsWith('/')" />
    <h1 style="margin-bottom:0">ProgMarchetto</h1>
    <!--<div id="nav">
      <router-link to="/">Home/Login</router-link> |
      <router-link to="/administrator-page">Administrator</router-link> |
      <router-link to="/uploader-page">Uploader</router-link> |
      <router-link to="/consumer-page">Consumer</router-link>
    </div>
     <p>{{this.$route.path}}</p> -->
  </header>
</template>

<script>
import Logout from "@/components/functions/Logout";

export default {
  name: "Header",
  components: {
    Logout,
  },
};
</script>
