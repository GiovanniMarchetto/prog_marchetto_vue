<template>
  <div>
    <h1>Home page</h1>
    <div v-show="sezione==''">
      <Login @login="login_home" />
      <br />
      <b-button @click="sezione='registration'">Non hai ancora un account</b-button>
    </div>
    <div v-show="sezione=='registration'">
      <Registration
        :potere="'consumer'"
        :role="'consumer'"
        @registrazione="registration_home"
      />
      <br />
      <b-button @click="sezione=''">Ho già un account!</b-button>
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
  methods: {
    login_home(frase) {
      this.showMsg(frase);
      if (!frase.startsWith("ERR")) {
        setTimeout(() => {
          if (localStorage.getItem("nomeUtente").length == 4) {
          this.$router.push("/uploader-page");
        } else if (localStorage.getItem("nomeUtente").includes("@")) {
          this.$router.push("/administrator-page");
        } else if (localStorage.getItem("nomeUtente").length == 16){
          this.$router.push("/consumer-page");
        } else {
          this.showMsg("ERR- Username non riscontrato...");
        }
        }, 1000);
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
