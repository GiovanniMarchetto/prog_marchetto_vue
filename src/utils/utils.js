export var messagesMixin = {
  data() {
    return {
      msg_success: "",
      msg_error: "",
      msg_warning: "",
    };
  },
  methods: {
    showMsg(frase) {
      if (frase.startsWith("ERR")||frase.startsWith("Err")) {
        this.msg_error = frase;
        this.$bvToast.show("msg_e");
      } else if (frase.startsWith("WARN")) {
        this.msg_warning = frase;
        this.$bvToast.show("msg_w");
      } else {
        this.msg_success = frase;
        this.$bvToast.show("msg_s");
      }
    },
    // creaToast(frase) {
    //   // eslint-disable-next-line no-unused-vars
    //   let titolo = "";
    //   let variante = "primary";
    //   if (frase.startsWith("ERR") || frase.startsWith("Err")) {
    //     titolo="ERROR";
    //     variante="danger";
    //   } else if (frase.startsWith("WARN")) {
    //     titolo="Warning!";
    //     variante="warning";
    //   } else {
    //     titolo="Success!";
    //     variante="success";
    //   }
    //   this.$bvToast.toast(frase, {
    //     title: "ciccio",
    //     autoHideDelay: 5000,
    //     appendToast: true,
    //     variant: variante
    //   });
    // },
  },
};

export var sectionsMixin = {
  data() {
    return {
      sezione: "",
    };
  },
  methods: {
    showSezione(sezione) {
      this.sezione = sezione;
    },
  },
};

export var formUtente = {
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
    reset() {
      this.username = "";
      this.password = "";
      this.name = "";
      this.email = "";
      this.logo = "";
    },
  },
};