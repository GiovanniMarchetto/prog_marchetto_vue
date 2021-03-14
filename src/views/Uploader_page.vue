<template>
  <div>
    <Navbar
      :potere="ruolo"
      :nomePrimaLista="'Lista consumer'"
      :nomeSecondaLista="'File di un consumer'"
      @mostraSezione="showSezione"
      @ruoloForm="modificaRuoloForm"
    />

    <div v-show="sezione == ''">
      <h2>Lista Consumer</h2>
      <Table
        :items="consumers"
        :fields="fieldsListConsumers"
        :details="'listConsumers'"
        @mostraFiles="showFiles"
      />
    </div>

    <div v-show="sezione == 'secondaLista'">
      <h2>Lista Files di {{ consumerScelto }}</h2>
      <Table
        :items="filesConsumer"
        :fields="fieldsListFileConsumer"
        :details="'listFilesConsumer'"
      />
    </div>

    <div v-show="sezione == 'registration'">
      <Registration
        :potere="ruolo"
        :role="'consumer'"
        @registrazione_utente="registrazione_utente_home"
        @registrazione="showMsg"
      />
    </div>
    <div v-show="sezione == 'modInfo'">
      <ModInfo
        :potere="ruolo"
        :role="ruoloForm"
        @modInfo_utente="modInfo_utente_home"
        @modInfo="showMsg"
      />
    </div>
    <div v-show="sezione == 'upload'">
      <Upload
        @upload_consumer="upload_consumer_home"
        @upload_file="upload_file_home"
        @upload="showMsg"
      />
    </div>
    <div v-show="sezione == 'delete'">
      <Delete
        :potere="ruolo"
        :attoriOptions="attoriOptions"
        :fileOptions="fileOptions"
        @delete_file="delete_file_home"
        @delete_username="delete_username_home"
        @delete="showMsg"
      />
    </div>

    <Messages
      :msg_success="msg_success"
      :msg_error="msg_error"
      :msg_warning="msg_warning"
    />
  </div>
</template>

<script>
import Navbar from "@/components/layout/Navbar";
import Table from "@/components/layout/Table";
import Upload from "../components/functions/Upload";
import Registration from "../components/functions/Registration";
import ModInfo from "../components/functions/ModInfo";
import Delete from "../components/functions/Delete";
import Messages from "../components/layout/Messages";

import { messagesMixin, sectionsMixin } from "../utils/utils";

import axios from "axios";
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "jwtToken"
)}`;

export default {
  name: "Uploader_page",
  components: {
    Navbar,
    Table,
    Upload,
    Registration,
    ModInfo,
    Delete,
    Messages,
  },
  mixins: [messagesMixin, sectionsMixin],
  data() {
    return {
      ruolo: "uploader",
      ruoloForm: "",
      consumerScelto: null,
      consumers: [],
      filesUploader: [],
      filesConsumer: [],
      fieldsListConsumers: ["username", "actions"],
      fieldsListFileConsumer: [
        "id",
        "name",
        { key: "dataCaricamento", sortable: true },
        { key: "dataVisualizzazione", sortable: true },
        "indirizzoIP",
        "hashtag",
      ],
    };
  },
  computed: {
    attoriOptions: function() {
      let listAttori = [];
      this.consumers.forEach((cons) => {
        listAttori.push(cons.username);
      });
      return listAttori;
    },
    fileOptions: function() {
      let listFiles = [];
      this.filesUploader.forEach((file) => {
        listFiles.push(file.id);
      });
      return listFiles;
    },
  },
  methods: {
    modificaRuoloForm(ruoloInput) {
      this.ruoloForm = ruoloInput;
    },
    showFiles(consUsername) {
      this.consumerScelto = consUsername;
      this.filesConsumer = null;
      this.filesConsumer = this.filesUploader.filter(
        (file) => file.usernameCons === consUsername
      );
      this.sezione = "secondaLista";
    },

    registrazione_utente_home(nuovoConsumer) {
      const { username, name, email, logo } = nuovoConsumer;
      const infoConsumer = {
        username: username,
        name: name,
        email: email,
        logo: logo,
      };
      this.consumers.push(infoConsumer);
      this.attoriOptions.push(username);
    },

    modInfo_utente_home(modConsumer) {
      const { utente, role } = modConsumer;
      if (role === "consumer") {
        this.consumers = this.consumers.filter(
          (cons) => cons.username !== utente.username
        );
        this.consumers.push(utente);
      }
    },

    upload_consumer_home(nuovoConsumer) {
      //TODO: controlla se funziona
      const { usernameCons } = nuovoConsumer;
      if (
        this.consumers.findIndex((el) => el.username === usernameCons) === -1
      ) {
        this.consumers.push(nuovoConsumer);
        this.attoriOptions.push(usernameCons);
      }
    },
    upload_file_home(fileCaricato) {
      this.filesUploader.push(fileCaricato);
      if (fileCaricato.usernameCons === this.consumerScelto)
        this.filesConsumer.push(fileCaricato);
      this.fileOptions.push(fileCaricato.id);
    },

    delete_file_home(fileIdDel) {
      this.filesUploader = this.filesUploader.filter(
        (file) => file.id !== fileIdDel
      );
      this.filesConsumer = this.filesConsumer.filter(
        (file) => file.id !== fileIdDel
      );
      this.fileOptions = this.fileOptions.filter(
        (fileId) => fileId !== fileIdDel
      );
    },
    delete_username_home(usernameDel) {
      this.consumers = this.consumers.filter(
        (cons) => cons.username !== usernameDel
      );
      this.attoriOptions = this.attoriOptions.filter(
        (cons) => cons !== usernameDel
      );
    },
  },
  created() {
    axios
      .get(`${process.env.VUE_APP_APIROOT}/list/consumers`)
      .then((res) => (this.consumers = res.data))
      .catch((err) => this.showMsg(err.toString()));

    axios
      .get(`${process.env.VUE_APP_APIROOT}/list/filesUploader`)
      .then((res) => (this.filesUploader = res.data))
      .catch((err) => this.showMsg(err.toString()));
  },
};
</script>