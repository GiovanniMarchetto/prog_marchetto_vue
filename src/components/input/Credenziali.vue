<template>
  <b-container fluid>
    <!-- <legend>Credenziali</legend> -->

    <b-form-group id="usernameInput-group" label="Username:" label-for="usernameInput">
      <b-form-input
        id="usernameInput"
        type="text"
        name="usernameInput"
        v-model="usernameInput"
        placeholder="username"
      />
    </b-form-group>

    <b-form-group id="passwordInput-group" label="Password:" label-for="passwordInput">
      <b-form-input
        id="passwordInput"
        type="password"
        name="passwordInput"
        v-model="passwordInput"
        placeholder="password"
      />
    </b-form-group>
  </b-container>
</template>

<script>

export default {
  name: "Credenziali",
  props: ["required", "username", "password"],
  computed: {
        usernameInput: {
            get: function(){
                return this.username;
            },
            set: function(newValue){
                this.$emit('update:username', newValue)
            }   
        },
        passwordInput: {
            get: function(){
                return this.password;
            },
            set: function(newValue){
                this.$emit('update:password', newValue)
            }   
        },
    },
  mounted() {
    if (this.required) {
      document.getElementById("usernameInput").setAttribute("required", "true");
      document.getElementById("passwordInput").setAttribute("required", "true");
    }
  },
};
</script>

<style></style>
