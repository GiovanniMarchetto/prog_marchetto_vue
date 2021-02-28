import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { BootstrapVue } from "bootstrap-vue";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
//Vue.use(IconsPlugin)

Vue.config.productionTip = false;

Vue.mixin({
  data() {
    return {
      msg_success: "",
      msg_error: "",
      sezione: "",
    };
  },
  methods: {
    showSezione(sezione) {
      this.sezione = sezione;
    },
    showMsg(frase) {
      if (frase.startsWith("ERR")) this.msg_error = frase;
      else this.msg_success = frase;

      setTimeout(() => {
        this.msg_error = "";
        this.msg_success = "";
      }, 5000);
    },
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
