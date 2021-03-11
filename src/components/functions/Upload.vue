<template>
  <div>
    <h2>Caricamento file</h2>
    <b-form @submit.prevent="upload" @reset.prevent="reset">
      <FileInput
        :file="file"
        :nameFile="nameFile"
        :hashtag="hashtag"
        @change-info="change_home"
      />

      <legend>Dati Consumer</legend>
      <b-container>
        <b-form-group
          id="usernameCons-group"
          label="Username consumer:"
          label-for="usernameCons"
        >
          <b-form-input
            id="usernameCons"
            type="text"
            name="usernameCons"
            v-model="usernameCons"
            placeholder="username consume"/></b-form-group
      ></b-container>
      <UserInfo @change-info="change_home" />
      <!-- devo passare i valori all'input -->
      <b-button type="submit" variant="success">Upload</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import FileInput from "../input/FileInput";
import UserInfo from "../input/UserInfo";

import axios from "axios";
if (localStorage.getItem("jwtToken") != null)
  axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
    "jwtToken"
  )}`;

export default {
  name: "Upload",
  components: {
    FileInput,
    UserInfo,
  },
  data() {
    return {
      file: "",
      nameFile: "",
      hashtag: "",
      extension: "",
      usernameCons: "",
      nameCons: "",
      emailCons: "",
    };
  },
  methods: {
    change_home(infos) {
      const { nameProp, valueProp } = infos;
      switch (nameProp) {
        case "file":
          this.file = valueProp;
          break;
        case "nameFile":
          this.nameFile = valueProp;
          break;
        case "hashtag":
          this.hashtag = valueProp;
          break;
        case "extension":
          this.extension = valueProp;
          break;
        // case "usernameCons":
        //   this.usernameCons = valueProp;
        //   break;
        case "name":
          this.nameCons = valueProp;
          break;
        case "email":
          this.emailCons = valueProp;
          break;
        default:
          console.log("switch concluso a vuoto");
          break;
      }
    },
    reset() {
      this.file = "";
      this.extension = "";
      this.nameFile = "";
      this.hashtag = "";
      this.usernameCons = "";
      this.nameCons = "";
      this.emailCons = "";
    },
    upload() {
      axios
        .post(`${process.env.VUE_APP_APIROOT}/files/upload`, {
          file: this.file,
          nameFile: this.nameFile + this.extension,
          hashtag: this.hashtag,
          usernameCons: this.usernameCons,
          nameCons: this.nameCons,
          emailCons: this.emailCons,
        })
        .then((res) => {
          if (!res.data.startsWith("ERR")) {
            //TODO: modificare se uso risposte
            const consumer = {
              username: this.usernameCons,
              name: this.nameCons,
              email: this.emailCons,
              logo: "",
            };
            this.$emit("upload_consumer", consumer);

            const dataCorrente = new Date();
            const fileCaricato = {
              id: "TODO", //TODO: mi devo far tornare l'id del file!!!!
              usernameUpl: localStorage.getItem("nomeUtente"),
              usernameCons: this.usernameCons,
              name: this.nameFile,
              dataCaricamento: dataCorrente.toISOString().substring(0, 10),
              dataVisualizzazione: "",
              indirizzoIP: "",
              hashtag: this.hashtag,
            };
            this.$emit("upload_file", fileCaricato);

            this.reset();
          }
          this.$emit("upload", res.data);
        })
        .catch((err) => {
          this.$emit("upload", "ERR - " + err);
        });
    },
  },
};
</script>

<style></style>
