<template>
  <div>
    <h2>Registration</h2>

    <b-form @submit.prevent="registration" @reset="reset">
      <Credenziali
        :required="true"
        :username="username"
        :password="password"
        @change-info="change_home"
      />

      <UserInfo
        :required="true"
        :name="name"
        :email="email"
        @change-info="change_home"
      />

      <Logo
        v-if="role === 'uploader'"
        :required="true"
        :logo="logo"
        @change-info="change_home"
      />

      <b-button type="submit" variant="success">Registrazione</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import Credenziali from "@/components/input/Credenziali";
import UserInfo from "@/components/input/UserInfo";
import Logo from "@/components/input/Logo";

import { formUtente } from "@/utils/utils";

import axios from "axios";
if (localStorage.getItem("jwtToken") != null)
  axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
    "jwtToken"
  )}`;

export default {
  name: "Registration",
  mixins: [formUtente],
  props: ["potere", "role"],
  components: {
    Credenziali,
    UserInfo,
    Logo,
  },
  data() {
    return {};
  },
  methods: {
    registration() {
      //TODO: non voglio avere troppa duplicazione di controllo
      //        però faccio comunque un controllo minimo?
      if (this.role === "administrator" && this.username !== this.email) {
        this.$emit(
          "registrazione",
          "ERR - Gli amministratori devono avere l'email uguale all'username"
        );
      } else {
        axios
          .post(`${process.env.VUE_APP_APIROOT}/attori/registration`, {
            username: this.username,
            password: this.password,
            name: this.name,
            email: this.email,
            role: this.role,
            logo: this.logo,
          })
          .then((res) => {
            this.reset();
            this.$emit("registrazione", res.data);
          })
          .catch((err) => {
            this.$emit("registrazione", err.toString());
          });
      }
    },
  },
};
</script>

<!--
const RegExConsumer = /^[A-Z0-9]+$/;
      const RegExUploader = /^[a-zA-Z0-9]+$/;

if (
        this.username === "" ||
        this.password === "" ||
        this.name === "" ||
        this.email === "" ||
        (this.role === "consumer" && this.potere === "administrator") ||
        (this.logo === "" && this.role === "uploader")
      ) {
        this.$emit("registrazione", "ERR - DEVI COMPILARE TUTTI I CAMPI");
      } else if (
        this.role === "consumer" &&
        this.username.length != 16 &&
        RegExConsumer.test(this.username)
      ) {
        this.$emit(
          "registrazione",
          "ERR - I consumer devono mettere il codice fiscale come username"
        );
      } else if (
        this.role === "uploader" &&
        this.username.length != 4 &&
        RegExUploader.test(this.username)
      ) {
        this.$emit(
          "registrazione",
          "ERR - Gli uploader devono avere un username di 4 caratteri alfanumerici"
        );
      } else
-->
