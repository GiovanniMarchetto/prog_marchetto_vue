<template>
  <div class="registration">
    <h2>Registration</h2>

    <b-form @submit.prevent="registration">
      <Credenziali :required="true" @change-info="change_home" />

      <UserInfo :required="true" @change-info="change_home" />

      <!-- <Ruolo v-if="potere === 'administrator'" @change-info="change_home" /> -->

      <Logo v-if="role === 'uploader'" :required="true" @change-info="change_home" />

      <b-button type="submit" variant="success">Registrazione</b-button>
    </b-form>
  </div>
</template>

<script>
import Credenziali from "@/components/input/Credenziali";
import UserInfo from "@/components/input/UserInfo";
import Logo from "@/components/input/Logo";

import axios from "axios";
if (localStorage.getItem("jwtToken") != null)
  axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
    "jwtToken"
  )}`;

export default {
  name: "Registration",
  props: ["potere", "role"],
  components: {
    Credenziali,
    UserInfo,
    Logo,
  },
  data() {
    return {
      username: "",
      password: "",
      name: "",
      email: "",
      logo: "",
    };
  },
  methods: {
    change_home(infos) {
      const { nameProp, valueProp } = infos;
      switch (nameProp) {
        case "username":
          this.username = valueProp;
          break;
        case "password":
          this.password = valueProp;
          break;
        case "name":
          this.name = valueProp;
          break;
        case "email":
          this.email = valueProp;
          break;
        case "role":
          this.role = valueProp;
          break;
        case "logo":
          this.logo = valueProp;
          break;
        default:
          console.log("switch concluso a vuoto");
          break;
      }
    },

    registration() {
      const RegExConsumer = /^[A-Z0-9]+$/;
      const RegExUploader = /^[a-zA-Z0-9]+$/;
      if (
        //todo: non dovrebbe servire più, tranne per il controllo che siano i campi vuoti
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
      } else if (
        this.role === "administrator" &&
        this.username !== this.email
      ) {
        this.$emit(
          "registrazione",
          "ERR - Gli amministratori devono avere la mail uguale all'username"
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
            console.log(res);
            if (!res.data.startsWith("ERR")) {
              this.$emit(
                "registrazione",
                "registrazione di " + this.username + " eseguita con successo"
              );
              this.username = "";
              this.password = "";
              this.name = "";
              this.email = "";
              this.logo = "";
            } else {
              this.$emit("registrazione", "ERR - " + res.data);
            }
          })
          .catch((err) => {
            this.$emit("registrazione", "ERR(esterno) - " + err);
          });
      }
    },
  },
};
</script>
