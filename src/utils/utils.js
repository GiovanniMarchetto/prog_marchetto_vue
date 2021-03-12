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
      // if (frase.startsWith("ERR")) this.msg_error = frase;
      // else this.msg_success = frase;

      // setTimeout(() => {
      //   this.msg_error = "";
      //   this.msg_success = "";
      // }, 5000);

      if (frase.startsWith("ERR")||frase.startsWith("Err")) {//alla fine solo il secondo dovrebbe rimanere
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
    reset() {
      this.username = "";
      this.password = "";
      this.name = "";
      this.email = "";
      this.logo = "";
    },
  },
};

export var changeInfoMixin = {
  methods: {
    change_info(e) {
      const valore = { nameProp: e.target.name, valueProp: e.target.value };
      this.$emit("change-info", valore);
    },
  }
}