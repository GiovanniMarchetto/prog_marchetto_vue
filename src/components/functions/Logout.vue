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
.btn-logout {
  background-color: brown;
  color: aliceblue;
  margin: 0;
}
</style>
