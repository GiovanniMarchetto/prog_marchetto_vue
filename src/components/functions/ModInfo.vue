<template>
  <div>
    <h2>Modifica informazioni</h2>

    <b-form @submit.prevent="modInfo" @reset="reset">
      <Credenziali
        v-show="potere != 'consumer'"
        :required="false"
        :username="username"
        :password="password"
        @change-info="change_home"
      />

      <UserInfo
        :required="false"
        :name="name"
        :email="email"
        @change-info="change_home"
      />

      <Logo
        v-if="role === 'uploader'"
        :required="false"
        :logo="logo"
        @change-info="change_home"
      />

      <b-button type="submit" variant="success">Modifica informazioni</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <section>
      <h3>Istruzioni per la modifica</h3>
      <p>Inserire i dati da modificare (non si può modificare l'username).</p>
      <p v-show="potere != 'consumer'">
        Se si vuole modificare le informazioni di un altro utente immettere
        l'username.
      </p>
    </section>
  </div>
</template>

<script>
import Credenziali from "@/components/input/Credenziali";
import UserInfo from "@/components/input/UserInfo";
import Logo from "@/components/input/Logo";

import { formUtente } from "@/utils/utils";

import axios from "axios";
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "jwtToken"
)}`;

export default {
  name: "ModInfo",
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
    modInfo() {
      axios
        .patch(`${process.env.VUE_APP_APIROOT}/attori/modInfo`, {
          username: this.username,
          password: this.password,
          name: this.name,
          email: this.email,
          role: this.role,
          logo: this.logo,
        })
        .then((res) => {
          const modUtente = {
            utente: res.data,
            role: this.role,
          };
          this.$emit("modInfo_utente", modUtente);
          if (this.username !== "")
            this.$emit(
              "modInfo",
              "Modifica attore eseguita - " + this.username
            );
          else
            this.$emit(
              "modInfo",
              "Modifica delle proprie informazioni eseguita"
            );
          this.reset();
        })
        .catch((err) => {
          this.$emit("modInfo", err.response.data);
        });
    },
  },
};
</script>

<style scoped></style>
