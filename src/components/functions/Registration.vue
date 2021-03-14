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
      axios
        .post(`${process.env.VUE_APP_APIROOT}/attori/registration`, {
          username: this.username,
          password: this.password,
          name: this.name,
          email: this.email,
          role: this.role,
          logo: this.logo
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
        });
      // }
    },
  },
};
</script>
