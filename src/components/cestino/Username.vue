<template>
<b-form-group>
    <b-form-input
      @change.native="change"
      id="username"
      type="text"
      name="username"
      v-model="username"
      placeholder="username"
    />
    </b-form-group>
</template>

<script>
export default {
  name: "Username",
  props: ["required"],
  data() {
    return {
      username: ""
    };
  },
  methods: {
    change(e) {
      const valore = { nameProp: e.target.name, valueProp: e.target.value };
      this.$emit("change-info", valore);
    },
  },
  mounted() {
    if (this.required)
      document.getElementById("username").setAttribute("required", "true");
  },
};
</script>

<style></style>
