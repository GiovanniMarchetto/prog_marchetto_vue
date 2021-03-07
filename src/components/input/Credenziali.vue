<template>
  <b-container
    ><!-- <legend>Credenziali</legend> -->

    <b-form-group id="username-group" label="Username:" label-for="username">
      <!-- description="We'll never share your email with anyone else." -->
      <b-form-input
        @change.native="change_info"
        id="username"
        type="text"
        name="username"
        v-model="username"
        placeholder="username"
      />
    </b-form-group>

    <b-form-group id="password-group" label="Password:" label-for="password">
      <b-form-input
        @change.native="change_info"
        id="password"
        type="password"
        name="password"
        v-model="password"
        placeholder="password"
      />
    </b-form-group>
    <!-- <b-form-group>
      <b-col sm="3">
        <label for="password">Password:</label>
      </b-col>

      <b-col sm="9">
        <b-form-input
          @change.native="change"
          id="password"
          type="password"
          name="password"
          v-model="password"
          placeholder="password"
        />
      </b-col>
    </b-form-group> -->
  </b-container>
</template>

<script>
import { changeInfoMixin } from "@/utils/utils";

export default {
  name: "Credenziali",
  props: ["required"],
  mixins: [changeInfoMixin],
  // computed: {
  //   // dovrei aggiungere l'attributo :state="nameState" e alle props:"ruolo"
  //   nameState() {
  //     if (this.ruolo == "consumer")
  //       return this.username.length === 16 ? true : false;
  //     else if (this.ruolo == "uploader")
  //       return this.username.length === 4 ? true : false;
  //     else return this.username.length > 3 ? true : false;
  //     // {
  //     //   const RegExAdministrator = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
  //     //   return RegExAdministrator.test(this.username) ? true : false;
  //     // }
  //   },
  // },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  mounted() {
    if (this.required) {
      document.getElementById("username").setAttribute("required", "true");
      document.getElementById("password").setAttribute("required", "true");
    }
  },
};
</script>

<style></style>
