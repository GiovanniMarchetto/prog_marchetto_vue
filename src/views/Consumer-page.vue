<template>
  <div>
    <b-container fluid v-show="uploaderScelto != null"
        ><b-img
          v-bind="imgProps"
          :src="`${uploaderScelto.logo}`"
          alt="Logo uploader"
          style=""
        ></b-img
      ></b-container>
    <h1>Consumer page</h1>
    <div v-if="uploaderScelto == null">
      <h2>Lista Uploader con documenti</h2>
      <Uploaders :uploaders="uploaders" @upl-files="showFiles" />
    </div>
    <div v-else>
      <!--non v-show perché altrimenti lo deve fare subito e non può perché null non ha elementi-->
      <h2>Lista Files caricati da {{ uploaderScelto.name }}</h2>
      

      <b-form inline @submit.prevent="hashtagFilter">
        <b-form-input
          id="hashtag"
          name="hashtag"
          type="text"
          v-model="hashtag"
          placeholder="hashtag"
        />
        <b-button type="submit" variant="primary" size="sm"
          >Filtra hashtag
        </b-button>
      </b-form>

      <Files :files="filesUploader" :ruolo="ruolo" @download-file="download" />

      <b-button
        v-if="uploaders.length > 1"
        variant="primary"
        @click="showUploaders()"
      >
        Vedi tutti gli uploaders
      </b-button>
      <!-- devo aggiungere per modificare l'info -->
    </div>

    <Messages :msg_success="msg_success" :msg_error="msg_error" />
  </div>
</template>

<script>
import Uploaders from "../components/lists/Uploaders";
import Files from "../components/lists/Files";
import Messages from "../components/layout/Messages";
import axios from "axios";
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "jwtToken"
)}`;

export default {
  name: "Consumer-page",
  components: {
    Uploaders,
    Files,
    Messages,
  },
  data() {
    return {
      msg_success: "",
      msg_error: "",
      ruolo: "consumer",
      uploaderScelto: null,
      hashtag: "",
      uploaders: [],
      filesConsumer: [],
      filesUploader: [],
      imgProps: {
        left: true,
        rounded: true,
        width: 400,
        height: 400,
      },
    };
  },
  watch: {
    uploaderScelto: function() {
      if (this.uploaderScelto != null)
        this.showFiles(this.uploaderScelto.username);
    },
  },
  methods: {
    showUploaders() {
      this.uploaderScelto = null;
    },
    showFiles(uplUsername) {
      this.filesUploader = null;
      this.filesUploader = this.filesConsumer.filter(
        (file) => file.usernameUpl === uplUsername
      );
      this.uploaderScelto = this.uploaders[0].filter(
        (uploader) => uploader.username === uplUsername
      );
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
    download(id) {
      axios
        .get(`${process.env.VUE_APP_APIROOT}/files/download/${id}`)
        .then((res) => {
          console.log(res);
          let indexCurrent = this.filesConsumer.findIndex(
            (file) => file.id === id
          );
          if (this.filesConsumer[indexCurrent].dataVisualizzazione === "")
            this.filesConsumer[indexCurrent].dataVisualizzazione = res.data;
          this.showMsg("Download effettuato");
        })
        .catch((err) => {
          this.showMsg(err);
        });
    },
    hashtagFilter() {
      this.filesUploader = null;
      this.filesUploader = this.filesConsumer.filter(
        (file) =>
          file.hashtag.includes(this.hashtag) &&
          file.usernameUpl === this.uploaderScelto.username
      );
    },
  },
  created() {
    axios
      .get(`${process.env.VUE_APP_APIROOT}/list/uploaders`)
      .then((res) => {
        this.uploaders = res.data;
        if (this.uploaders.length === 1)
          this.uploaderScelto = this.uploaders[0];
      })
      .catch((err) => this.showMsg(err));

    axios
      .get(`${process.env.VUE_APP_APIROOT}/list/filesConsumer`)
      .then((res) => {
        this.filesConsumer = res.data;
        setTimeout(() => {}, 1000);
        if (this.uploaderScelto != null)
          this.showFiles(this.uploaderScelto.username);
      })
      .catch((err) => this.showMsg(err));

    console.log(process.env.VUE_APP_APIROOT);
  },
};
</script>

<style scoped>
/* .nav2 {
  background-color: cadetblue;
}
.buu {
  height: 5em;
  width: 10em;
  background-color: coral;
}
:hover.buu {
  background-color: aquamarine;
} */

form {
  flex-direction: row;
}
/* 
#snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: red;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
} */
</style>
