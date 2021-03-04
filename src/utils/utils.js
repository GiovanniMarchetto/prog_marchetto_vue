export var messagesMixin = {
  data() {
    return {
      msg_success: "",
      msg_error: "",
    };
  },
  methods: {
    showMsg(frase) {
      if (frase.startsWith("ERR")) this.msg_error = frase;
      else this.msg_success = frase;

      setTimeout(() => {
        this.msg_error = "";
        this.msg_success = "";
      }, 5000);
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
