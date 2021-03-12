<template>

  <b-button @click="logout" class="btn-logout">Logout</b-button>

</template>

<script>
export default {
  methods: {
    logout: function() {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("nomeUtente");
      this.$emit("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* Alla fine ho optato per un logout di questo tipo invece che metterlo nel nav */
 .btn-logout {
  float: left; 
  background-color: brown;
  color: aliceblue;
}
</style>
