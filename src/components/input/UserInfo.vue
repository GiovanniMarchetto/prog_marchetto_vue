<template>
  <b-container fluid>
    <b-form-group id="nameInput-group" label="Name:" label-for="nameInput">
      <b-form-input
        id="nameInput"
        type="text"
        name="nameInput"
        v-model="nameInput"
        placeholder="name"
      />
    </b-form-group>

    <b-form-group id="emailInput-group" label="Email:" label-for="emailInput">
      <b-form-input
        id="emailInput"
        type="email"
        name="emailInput"
        v-model="emailInput"
        placeholder="email"
      />
    </b-form-group>
  </b-container>
</template>

<script>
export default {
  name: "UserInfo",
  props: ["required", "name", "email"],
  computed: {
    nameInput: {
      get: function() {
        return this.name;
      },
      set: function(newValue) {
        this.$emit("update:name", newValue);
      },
    },
    emailInput: {
      get: function() {
        return this.email;
      },
      set: function(newValue) {
        this.$emit("update:email", newValue);
      },
    },
  },
  mounted() {
    if (this.required) {
      document.getElementById("nameInput").setAttribute("required", "true");
      document.getElementById("emailInput").setAttribute("required", "true");
    }
  },
};
</script>

<style></style>
