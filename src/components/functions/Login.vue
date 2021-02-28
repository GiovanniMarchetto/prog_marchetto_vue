<template>
  <div>
    <h2>Login Page</h2>
    <b-form @submit.prevent="login">
      <UsernamePassword @change-info="change_home" />

      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import UsernamePassword from "@/components/input/UsernamePassword";
import axios from "axios";
export default {
  name: "Login",
  components: {
    UsernamePassword,
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      axios
        .post(`${process.env.VUE_APP_APIROOT}/login`, {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          if (!res.data.startsWith("ERR")) {
            localStorage.setItem("jwtToken", res.data);
            localStorage.setItem("nomeUtente", this.username);
            this.$emit(
              "login",
              "login di " + this.username + " eseguita con successo"
            );
          } else {
            this.$emit("login", "ERR - " + res.data);
          }
        })
        .catch((err) => {
          this.$emit("login", "ERR(esterno) - " + err);
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
