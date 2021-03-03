<template>
  <div>
    <h2>Modifica informazioni</h2>

    <form @submit.prevent="modInfo">
      <Credenziali v-if="potere != 'consumer'" @change-info="change_home" />

      <UserInfo @change-info="change_home" />

      <!-- <Ruolo v-if="potere === 'administrator'" @change-info="change_home" /> -->

      <Logo v-if="role === 'uploader'" @change-info="change_home" />

      <b-button type="submit" variant="success">Modifica informazioni</b-button>
    </form>

    <h3>Istruzioni per la modifica</h3>
    <p>Inserire i dati da modificare (non si può modificare l'username).</p>
    <p v-show="potere != 'consumer'">
      Se si vuole modificare le informazioni di un altro utente immettere
      l'username.
    </p>
  </div>
</template>

<script>
import Credenziali from "@/components/input/Credenziali";
import UserInfo from "@/components/input/UserInfo";
import Logo from "@/components/input/Logo";

import axios from "axios";
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "jwtToken"
)}`;

export default {
  name: "ModInfo",
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
          break;
      }
    },

    modInfo() {
      axios
        .post(`${process.env.VUE_APP_APIROOT}/attori/modInfo`, {
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
              "modInfo",
              "modifica informazioni " +
                this.username +
                " eseguita con successo"
            );
          } else {
            this.$emit("modInfo", "ERR - " + res.data);
          }
        })
        .catch((err) => {
          this.$emit("modInfo", "ERR(esterno) - " + err);
        });
    },
  },
};
</script>

<style scoped>
/* form {
  display: flex;
  flex-direction: column;
  max-width: 50em;
  margin: 0 auto;
}
input {
  width: 40%;
  border: 1px solid green;
  padding: 10px;
  margin-bottom: 20px;
}
input[type="submit"] {
  background-color: green;
  color: white;
  padding: 10px;
  width: 30%;
}  */
</style>
