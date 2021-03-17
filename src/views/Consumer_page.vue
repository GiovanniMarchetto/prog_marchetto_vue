<template>
  <div>
    <b-container id="logoUploader" fluid v-show="sezione == 'secondaLista'">
      <b-img
        v-bind="imgProps"
        :src="`${uploaderScelto.logo}`"
        alt="Logo uploader"
      ></b-img
    ></b-container>
    <Navbar
      :potere="ruolo"
      :nomePrimaLista="'Lista uploader'"
      :nomeSecondaLista="'File di un uploader'"
      @mostraSezione="showSezione"
    />

    <div v-show="sezione == ''">
      <h2>Lista Uploader con documenti</h2>
      <Table
        :items="uploaders"
        :fields="fieldsListUploaders"
        :details="'listUploaders'"
        @mostraFiles="showFiles"
      />
    </div>

    <div v-show="sezione == 'secondaLista'">
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

      <Table
        :items="filesUploader"
        :fields="fieldsListFilesUploader"
        :details="'listFilesUploader'"
        @download-file="download"
      />
    </div>

    <div v-show="sezione == 'modInfo'">
      <ModInfo :potere="ruolo" :role="'consumer'" @modInfo="showMsg" />
    </div>

    <Messages
      :msg_success="msg_success"
      :msg_error="msg_error"
      :msg_warning="msg_warning"
    />
    <Spinner :attesa="attesa" />
  </div>
</template>

<script>
import Navbar from "@/components/layout/Navbar";
import Spinner from "@/components/layout/Spinner";
import Table from "@/components/layout/Table";
import ModInfo from "../components/functions/ModInfo";
import Messages from "../components/layout/Messages";

import { messagesMixin, sectionsMixin } from "../utils/utils";

import axios from "axios";
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "jwtToken"
)}`;

export default {
  name: "Consumer_page",
  components: { Navbar, Table, ModInfo, Messages, Spinner },
  mixins: [messagesMixin, sectionsMixin],
  data() {
    return {
      ruolo: "consumer",
      uploaderScelto: "",
      hashtag: "",
      uploaders: [],
      filesConsumer: [],
      filesUploader: [],
      fieldsListUploaders: ["logo", "username", "actions"],
      fieldsListFilesUploader: [
        "name",
        { key: "dataCaricamento", sortable: true },
        { key: "dataVisualizzazione", sortable: true },
        "hashtag",
        "actions",
      ],
      imgProps: {
        // left: true,
        block: true,
        rounded: "circle",
        width: 150,
        height: 150,
      },
      attesa: false,
    };
  },
  watch: {
    uploaderScelto: function() {
      if (this.uploaderScelto != "")
        this.showFiles(this.uploaderScelto.username);
    },
  },
  methods: {
    showFiles(usernameUploader) {
      this.sezione = "secondaLista";
      this.filesUploader = this.filesConsumer.filter(
        (file) => file.usernameUpl === usernameUploader
      );
      this.uploaders.every((element) => {
        if (element.username === usernameUploader) {
          this.uploaderScelto = element;
          return false;
        }
        return true;
      });
    },
    ordinamentoFile() {
      this.filesConsumer.sort(function(a, b) {
        if ((a.dataVisualizzazione === "") ^ (b.dataVisualizzazione === "")) {
          if (a.dataVisualizzazione < b.dataVisualizzazione) return -1;
          if (a.dataVisualizzazione > b.dataVisualizzazione) return 1;
        }
        if (a.dataCaricamento < b.dataCaricamento) return 1;
        if (a.dataCaricamento > b.dataCaricamento) return -1;
        return 0;
      });
      this.filesUploader = this.filesConsumer.filter(
        (file) => file.usernameUpl === this.uploaderScelto.username
      );
    },
    download(id) {
      this.attesa = true;
      axios
        .get(`${process.env.VUE_APP_APIROOT}/files/download/${id}`)
        .then((res) => {
          let indexCurrent = this.filesConsumer.findIndex(
            (file) => file.id === id
          );

          const link = document.createElement("a");
          link.style.display = "none";
          link.download = this.filesConsumer[indexCurrent].name;
          var blob = new Blob([res.data], { type: "octet/stream" });
          link.href = window.URL.createObjectURL(blob);
          link.click();

          if (this.filesConsumer[indexCurrent].dataVisualizzazione === "") {
            let dataCorrente = new Date();
            let dataScritta =
              dataCorrente.toISOString().substring(0, 10) +
              " " +
              dataCorrente.toLocaleTimeString();
            this.filesConsumer[indexCurrent].dataVisualizzazione = dataScritta;
            this.ordinamentoFile();
          }
          this.showMsg("Download effettuato");
        })
        .catch((err) => {
          this.showMsg(err.response.data);
        })
        .finally(() => {
          this.attesa = false;
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
    this.attesa = true;
    axios
      .get(`${process.env.VUE_APP_APIROOT}/list/uploaders`)
      .then((res) => {
        this.uploaders = res.data;
        if (this.uploaders.length === 1)
          this.uploaderScelto = this.uploaders[0];
      })
      .catch((err) => this.showMsg(err.toString()));

    axios
      .get(`${process.env.VUE_APP_APIROOT}/list/filesConsumer`)
      .then((res) => {
        this.filesConsumer = res.data;
        setTimeout(() => {}, 1000);
        if (this.uploaderScelto != "")
          this.showFiles(this.uploaderScelto.username);
      })
      .catch((err) => this.showMsg(err.toString()))
      .finally(() => {
        this.attesa = false;
      });
  },
};
</script>

<style scoped>
#logoUploader {
  background: #343a40;
}
</style>
