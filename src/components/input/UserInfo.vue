<template>
  <b-container>
    <!-- <legend>Informazioni utente</legend> -->

    <b-form-group id="name-group" label="Name:" label-for="name">
      <b-form-input
        @change.native="change_info"
        id="name"
        type="text"
        name="name"
        v-model="name"
        placeholder="name"
      />
    </b-form-group>

    <b-form-group id="email-group" label="Email:" label-for="email">
      <b-form-input
        @change.native="change_info"
        id="email"
        type="email"
        name="email"
        v-model="email"
        placeholder="email"
      />
    </b-form-group>
  </b-container>
</template>

<script>
import { changeInfoMixin } from "@/utils/utils";

export default {
  name: "UserInfo",
  props: ["required"],
  mixins: [changeInfoMixin],
  data() {
    return {
      name: "",
      email: "",
    };
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
