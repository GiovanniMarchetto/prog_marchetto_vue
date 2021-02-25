<template>
  <div>
    <div v-if="mostraLogin">
      <Login @login="login_home" />
      <br />
      <b-button @click="show">Non hai ancora un account</b-button>
    </div>
    <div v-else>
      <Registration
        :potere="ruolo"
        :role="roleRegistrazione"
        @registrazione="registration_home"
      />
      <br />
      <b-button @click="show">Ho già un account!</b-button>
    </div>

    <Messages :msg_success="msg_success" :msg_error="msg_error" />
  </div>
</template>

<script>
import Login from "../components/functions/Login";
import Registration from "../components/functions/Registration";
import Messages from "../components/layout/Messages";

export default {
  name: "Home",
  components: {
    Login,
    Registration,
    Messages,
  },
  data() {
    return {
      mostraLogin: true,
      ruolo: "consumer",
      roleRegistrazione: "consumer",
      msg_success: "",
      msg_error: "",
    };
  },
  methods: {
    show() {
      this.mostraLogin = !this.mostraLogin;
    },

    showMsg(frase) {
      this.$emit(frase);
      if (frase.startsWith("ERR")) this.msg_error = frase;
      else this.msg_success = frase;

      setTimeout(() => {
        this.msg_error = "";
        this.msg_success = "";
      }, 5000);
    },

    login_home(frase) {
      this.showMsg(frase);
      if (!frase.startsWith("ERR")) {
        setTimeout(() => {}, 2000);
        if (localStorage.getItem("nomeUtente").length == 4) {
          this.$router.push("/uploader-page");
        } else if (localStorage.getItem("nomeUtente").includes("@")) {
          this.$router.push("/administrator-page");
        } else {
          this.$router.push("/consumer-page");
        }
      }
    },

    registration_home(frase) {
      this.showMsg(frase);
    },
  },
  created() {
    console.log(process.env.VUE_APP_APIROOT);
  },
};
</script>
