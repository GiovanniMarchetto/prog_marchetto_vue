<template>
  <div>
    <b-button @click="logout" class="btn-logout">Logout</b-button>
  </div>
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
  float: right;
  background-color: brown;
  color: aliceblue;
}
</style>
