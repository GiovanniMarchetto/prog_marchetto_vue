<template>
  <div>
    <h2>Login Page</h2>

    <b-form @submit.prevent="login">
      <Credenziali
        :required="true"
        :username="username"
        :password="password"
        @change-info="change_home"
      />
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>

    <div v-show="attesa == true">
      <b-button block variant="light" disabled>
        <b-spinner small></b-spinner>
        Loading...
      </b-button>
    </div>
  </div>
</template>

<script>
import Credenziali from "@/components/input/Credenziali";
import axios from "axios";
export default {
  name: "Login",
  components: {
    Credenziali,
  },
  data() {
    return {
      // TODO POSSO METTERE IL MIXIN ANCHE SE HA COSE IN PIÙ
      username: "",
      password: "",
      attesa: false,
    };
  },
  methods: {
    login() {
      this.attesa = true;
      axios
        .post(`${process.env.VUE_APP_APIROOT}/login`, {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("jwtToken", res.data);
          localStorage.setItem("nomeUtente", this.username);
          this.$emit("login", "Login eseguito - "+this.username);
          this.$emit("login_username",this.username);
          this.attesa = false;
        })
        .catch((err) => {
          this.$emit("login", err.response.data);
          this.attesa = false;
        });
    },
    change_home(infos) {
      const { nameProp, valueProp } = infos;
      switch (nameProp) {
        case "username":
          this.username = valueProp;
          break;
        case "password":
          this.password = valueProp;
          break;
        default:
          break;
      }
    },
  },
};
</script>
