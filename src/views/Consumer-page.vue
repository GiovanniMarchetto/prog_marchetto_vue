<template>
  <div>
    <b-container fluid v-show="sezione=='files'"
      ><b-img
        v-bind="imgProps"
        :src="`${uploaderScelto.logo}`"
        alt="Logo uploader"
      ></b-img
    ></b-container>

    <h1>Consumer page</h1>

    <b-nav pills justified class="nav2">
      <b-nav-item @click="showSezione('')">Lista uploaders</b-nav-item>
      <b-nav-item @click="showSezione('files')">File di un uploader</b-nav-item>
      <b-nav-item @click="showSezione('modificaInfo')">Modifica informazioni</b-nav-item>
    </b-nav>

    <div v-show="sezione == ''">
      <h2>Lista Uploader con documenti</h2>
      <Uploaders :uploaders="uploaders" @upl-files="showFiles" />
    </div>

    <div v-show="sezione=='files'">
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
        <b-button
          variant="danger"
          size="sm"
          @click="(hashtag = ''), hashtagFilter()"
        >
          Reset</b-button
        >
      </b-form>

      <Files :files="filesUploader" :ruolo="ruolo" @download-file="download" />

    </div>

    <div v-show="sezione=='modificaInfo'">
      <ModInfo
        :potere="ruolo"
        :role="'consumer'"
        @modInfo="modInfo_home"
      />
    </div>

    <Messages :msg_success="msg_success" :msg_error="msg_error" />
  </div>
</template>

<script>
import Uploaders from "../components/lists/Uploaders";
import Files from "../components/lists/Files";
import ModInfo from "../components/functions/ModInfo";
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
    ModInfo,
    Messages,
  },
  data() {
    return {
      ruolo: "consumer",
      uploaderScelto: "",
      hashtag: "",
      uploaders: [],
      filesConsumer: [],
      filesUploader: [],
      imgProps: {
        left: true,
        rounded: "circle",
        width: 400,
        height: 400,
      },
    };
  },
  watch: {
    uploaderScelto: function() {
      if (this.uploaderScelto != "")
        this.showFiles(this.uploaderScelto.username);
    },
  },
  methods: {
    showFiles(uplUsername) {
      this.sezione="files";
      this.filesUploader = null;
      this.filesUploader = this.filesConsumer.filter(
        (file) => file.usernameUpl === uplUsername
      );
      this.uploaders.every((element) => {
        if (element.username === uplUsername) {
          this.uploaderScelto = element;
          return false;
        }
        return true;
      });
    },
    modInfo_home(frase) {
      this.showMsg(frase);
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
        if (this.uploaderScelto != "")
          this.showFiles(this.uploaderScelto.username);
      })
      .catch((err) => this.showMsg(err));

    console.log(process.env.VUE_APP_APIROOT);
  },
};
</script>

<style scoped></style>
