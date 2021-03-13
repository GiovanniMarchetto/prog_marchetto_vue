<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand @click="showSezione('')">Uploader page</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav
        ><b-navbar-nav class="ml-auto">
          <b-nav-item @click="showSezione('')">Lista consumer</b-nav-item>
          <b-nav-item @click="showSezione('files')"
            >File di un consumer</b-nav-item
          >
          <b-nav-item
            @click="
              showSezione('registration'), (roleRegistrazione = 'consumer')
            "
            >Creare Consumer</b-nav-item
          >

          <b-nav-item-dropdown text="Modifica Attore">
            <b-dropdown-item
              @click="showSezione('modInfo'), (roleRegistrazione = 'consumer')"
              >Consumer</b-dropdown-item
            >
            <b-dropdown-item
              @click="showSezione('modInfo'), (roleRegistrazione = 'uploader')"
              >Uploader</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item @click="showSezione('upload')"
            >Carica nuovo file</b-nav-item
          >
          <b-nav-item @click="showSezione('delete')"
            >Elimina</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div v-show="sezione == ''">
      <h2>Lista Consumer</h2>
      <Table
        :items="consumers"
        :fields="fieldsListConsumers"
        :details="'listConsumers'"
        @cons-files="showFiles"
      />
    </div>
    <div v-show="sezione == 'files'">
      <h2>Lista Files di {{ consumerScelto }}</h2>
      <Table
        :items="filesConsumer"
        :fields="fieldsListFileConsumer"
        :details="'listFilesConsumer'"
        @del-file="deleteAct"
      />
    </div>

    <div v-show="sezione == 'registration'">
      <Registration
        :potere="ruolo"
        :role="roleRegistrazione"
        @registrazione="registration_home"
      />
    </div>
    <div v-show="sezione == 'modInfo'">
      <ModInfo
        :potere="ruolo"
        :role="roleRegistrazione"
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
import Upload from "../components/functions/Upload";
import Registration from "../components/functions/Registration";
import ModInfo from "../components/functions/ModInfo";
import Delete from "../components/functions/Delete";
import Messages from "../components/layout/Messages";

import Table from "@/components/layout/Table";

import { messagesMixin, sectionsMixin } from "../utils/utils";

import axios from "axios";
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "jwtToken"
)}`;

export default {
  name: "Uploader-page",
  components: {
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
      roleRegistrazione: "",
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
        "actions",
      ],
      attoriOptions:[],
      fileOptions:[],
    };
  },
  watch: {
    consumers:function(){
      this.attoriOptions=[];
      this.consumers.forEach(cons => {
        this.attoriOptions.push(cons.username);
      });
    },
    filesUploader:function(){
      this.fileOptions = [];
      this.filesUploader.forEach(file => {
        this.fileOptions.push(file.id);
      });
    }
  },
  methods: {
    showFiles(consUsername) {
      //TODO: considera il fatto di dividere il fatto di mostrare i file dal fatto di mandarlo nella sezione dei file
      this.filesConsumer = null;
      this.filesConsumer = this.filesUploader.filter(
        (file) => file.usernameCons === consUsername
      );
      this.consumerScelto = consUsername;
      this.sezione = "files";
    },
    deleteAct(id) {
      let tipo;
      if (this.consumerScelto === null) tipo = "attori";
      else tipo = "files";

      axios
        .delete(`${process.env.VUE_APP_APIROOT}/${tipo}/delete/${id}`)
        .then((res) => {
          this.showMsg(res.data);
          if (tipo == "attori")
            this.consumers = this.consumers.filter(
              (cons) => cons.username !== id
            );
          else {
            this.filesUploader = this.filesUploader.filter(
              (file) => file.id !== id
            );
            this.filesConsumer = this.filesUploader.filter(
              (file) => file.usernameCons === this.consumerScelto
            );
          }
        })
        .catch((err) => {
          this.showMsg(err.toString());
        });
    },
    registration_home(frase) {
      this.showMsg(frase);
    },
    modInfo_home(frase) {
      this.showMsg(frase);
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
