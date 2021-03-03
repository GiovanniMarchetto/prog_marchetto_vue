<template>
  <b-form-group>
    <legend>Informazioni utente</legend>

    <label for="name">Name:</label>

    <b-form-input
      @change.native="change"
      id="name"
      type="text"
      name="name"
      v-model="name"
      placeholder="name"
    />

    <label for="email">Email:</label>

    <b-form-input
      @change.native="change"
      id="email"
      type="email"
      name="email"
      v-model="email"
      placeholder="email"
    />
  </b-form-group>
</template>

<script>
export default {
  name: "UserInfo",
  props: ["required"],
  data() {
    return {
      name: "",
      email: "",
    };
  },
  methods: {
    change(e) {
      const valore = { nameProp: e.target.name, valueProp: e.target.value };
      this.$emit("change-info", valore);
    },
  },
  mounted() {
    if (this.required) {
      document.getElementById("name").setAttribute("required", "true");
      document.getElementById("email").setAttribute("required", "true");
    }
  },
};
</script>

<style></style>
