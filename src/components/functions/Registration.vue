<template>
  <div>
    <h2>Registrazione {{ role }}</h2>

    <b-form @submit.prevent="registration" @reset="reset">
      <Credenziali
        :required="true"
        :username.sync="username"
        :password.sync="password"
      />

      <UserInfo :required="true" :name.sync="name" :email.sync="email" />

      <Logo v-if="role === 'uploader'" :required="true" :logo.sync="logo" />

      <b-button type="submit" variant="success">Registrazione</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <Spinner :attesa="attesa" />
    <b-container fluid>
      <section>
        <h3>Istruzioni per la registrazione</h3>
        <p v-show="potere === 'consumer'">
          Come username bisogna immettere un codice fiscale valido.
        </p>
        <p v-show="potere === 'uploader'">
          Gli uploader devono avere come username un codice alfa-numerico di 4
          caratteri.
        </p>
        <p v-show="potere === 'administrator'">
          Gli administrator devono avere come username un'email valida.
        </p>
      </section>
    </b-container>
  </div>
</template>

<script>
import Spinner from "@/components/layout/Spinner";
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
    Spinner,
  },
  data() {
    return { attesa: false };
  },
  methods: {
    registration() {
      this.attesa = true;
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
          const nuovoUtente = {
            username: this.username,
            password: this.password,
            name: this.name,
            email: this.email,
            role: this.role,
            logo: this.logo,
          };
          this.$emit("registrazione_utente", nuovoUtente);
          this.$emit("registrazione", res.data);
          this.reset();
        })
        .catch((err) => {
          this.$emit("registrazione", err.response.data);
        })
        .finally(() => {
          this.attesa = false;
        });
    },
  },
};
</script>
