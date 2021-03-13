<template>
  <div>
    <div v-show="sezione == ''">
      <Login @login="login_home" @login_username="login_username_home" />
      <b-button @click="sezione = 'registration'"
        >Non hai ancora un account</b-button
      >
    </div>
    <div v-show="sezione == 'registration'">
      <Registration
        :potere="'consumer'"
        :role="'consumer'"
        @registrazione="registration_home"
      />
      <b-button @click="sezione = ''">Ho già un account!</b-button>
    </div>

    <Messages
      :msg_success="msg_success"
      :msg_error="msg_error"
      :msg_warning="msg_warning"
    />
  </div>
</template>

<script>
import Login from "../components/functions/Login";
import Registration from "../components/functions/Registration";
import Messages from "../components/layout/Messages";

import { messagesMixin, sectionsMixin } from "../utils/utils";

export default {
  name: "Login_page",
  components: { Login, Registration, Messages },
  mixins: [messagesMixin, sectionsMixin],
  methods: {
    login_home(frase) {
      this.showMsg(frase);
    },
    login_username_home(username) {
      setTimeout(() => {
        if (username.length == 4) {
          this.$router.push("/uploader_page");
        } else if (username.includes("@")) {
          this.$router.push("/administrator_page");
        } else if (username.length == 16) {
          this.$router.push("/consumer_page");
        } else {
          this.showMsg("Error: Username non riscontrato...");
        }
      }, 1000);
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
