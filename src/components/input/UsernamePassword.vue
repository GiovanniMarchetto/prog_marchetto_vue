<template>
  <b-form-group>
    <legend>Credenziali</legend>
    <label for="username">Username:</label>

    <b-form-input
      @change.native="change"
      id="username"
      type="text"
      name="username"
      v-model="username"
      placeholder="username"
    />

    <label for="password">Password:</label>

    <b-form-input
      @change.native="change"
      id="password"
      type="password"
      name="password"
      v-model="password"
      placeholder="password"
    />
  </b-form-group>
</template>

<script>
export default {
  name: "UsernamePassword",
  // props: ["required"],
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    change(e) {
      const valore = { nameProp: e.target.name, valueProp: e.target.value };
      this.$emit("change-info", valore);
    },
  },
  // created() {
  //   if (this.required) {
  //     document
  //       .getElementsByTagName("INPUT")[0]
  //       .setAttribute("required", "false");
  //     document
  //       .getElementsByTagName("INPUT")[1]
  //       .setAttribute("required", "true");
  //   }
  // },
};
</script>

<style></style>
