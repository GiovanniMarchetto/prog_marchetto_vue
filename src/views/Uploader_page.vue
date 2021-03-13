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
        @cons-files="showFiles"
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
        @registrazione="registration_home"
      />
    </div>
    <div v-show="sezione == 'modInfo'">
      <ModInfo
        :potere="ruolo"
        :role="ruoloForm"
        @modInfo="modInfo_home"
      />
    </div>
    <div v-show="sezione == 'upload'">
      <Upload
        @upload_consumer="upload_consumer_home"
        @upload_file="upload_file_home"
        @upload="upload_home"
      />
    </div>
    <div v-show="sezione == 'delete'">
      <Delete
        :potere="ruolo"
        :attoriOptions="attoriOptions"
        :fileOptions="fileOptions"
        @delete_file="delete_file_home"
        @delete_username="delete_username_home"
        @delete="delete_home"
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
      attoriOptions: [],
      fileOptions: [],
    };
  },
  watch: {
    consumers: function() {
      this.attoriOptions = [];
      this.consumers.forEach((cons) => {
        this.attoriOptions.push(cons.username);
      });
    },
    filesUploader: function() {
      this.fileOptions = [];
      this.filesUploader.forEach((file) => {
        this.fileOptions.push(file.id);
      });
    },
  },
  methods: {
    modificaRuoloForm(ruoloInput) {
      this.ruoloForm = ruoloInput;
    },
    showFiles(consUsername) {
      //TODO: considera il fatto di dividere il fatto di mostrare i file dal fatto di mandarlo nella sezione dei file
      this.filesConsumer = null;
      this.filesConsumer = this.filesUploader.filter(
        (file) => file.usernameCons === consUsername
      );
      this.consumerScelto = consUsername;
      this.sezione = "secondaLista";
    },

    registration_home(frase) {
      this.showMsg(frase); //TODO: da rifare il resume?
    },
    modInfo_home(frase) {
      this.showMsg(frase); //TODO: da rifare il resume?
    },

    upload_consumer_home(nuovoConsumer) {
      //TODO: controlla se funziona
      const { usernameCons } = nuovoConsumer;
      if (this.consumers.findIndex((el) => el.username === usernameCons) === -1)
        this.consumers.push(nuovoConsumer);
    },
    upload_file_home(fileCaricato) {
      this.filesUploader.push(fileCaricato);
      this.showFiles(this.consumerScelto);
      this.sezione = "upload"; //TODO: controlla se funziona e quanto lag procura questa ricarica
    },
    upload_home(frase) {
      this.showMsg(frase);
      //TODO se è ok devo mandare un messaggio che bisogna riaggiornare la pagina per vedere i file appena caricato
      //TODO fare il confronto tra i consumer in lista, se non presente lo si aggiunge
    },

    delete_file_home(fileIdDel) {
      this.filesUploader = this.filesUploader.filter(
        (file) => file.id !== fileIdDel
      );
      this.filesConsumer = this.filesUploader.filter(
        (file) => file.usernameCons === this.consumerScelto
      );
    },
    delete_username_home(usernameDel) {
      this.consumers = this.consumers.filter(
        (cons) => cons.username !== usernameDel
      );
    },
    delete_home(frase) {
      this.showMsg(frase);
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
