<template>
  <div>
    <button @click="logout" class="btn-warn">Log out</button>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  methods: {
    logout: function() {
      // axios
      //   .delete(`${process.env.VUE_APP_APIROOT}/sessioni/logout`)
      //   .then(
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('nomeUtente');
          this.$emit("logout");
          this.$router.push("/");
        //   )
        // .catch((err) => console.log(err));
    }
  },
};
</script>

<style>
.btn-warn{
  float: right;
  background-color: brown;
  color:aliceblue;
}
</style>
