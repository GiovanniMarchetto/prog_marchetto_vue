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

      <b-form-group>
        <legend>Dati Consumer</legend>
        <label for="usernameCons">Username:</label>
        <b-form-input
          id="usernameCons"
          type="text"
          name="usernameCons"
          v-model="usernameCons"
          required
          placeholder="username consumer"
        />
        <UserInfo @change-info="change_home" />
      </b-form-group>

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
            this.$emit("upload", res.data);
            this.reset();
          } else {
            this.$emit("upload", "ERR - " + res.data);
          }
        })
        .catch((err) => {
          this.$emit("upload", "ERR(esterno) - " + err);
        });
    },
  },
};
</script>

<style></style>
