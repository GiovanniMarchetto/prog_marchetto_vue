<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Uploader page</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav
        ><b-navbar-nav class="ml-auto">
          <b-nav-item @click="showSezione('')">Lista consumer/file</b-nav-item>
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
          <!-- <b-nav-item @click="showSezione('deleteActor')">Eliminazione Consumer</b-nav-item> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div v-show="sezione == ''">
      <h2>Lista Consumer</h2>
      <Consumers
        v-bind:consumers="consumers"
        @cons-files="showFiles"
        @del-cons="deleteAct"
      />
    </div>
    <div v-show="sezione == 'files'">
      <h2>Lista Files di {{ consumerScelto }}</h2>
      <Files :files="filesConsumer" :ruolo="ruolo" @del-file="deleteAct" />
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
      <Upload @upload="upload_home" />
    </div>
    <!-- <div v-show="sezione == 'deleteActor'">
      <DeleteActor :potere="ruolo" @deleteActor="deleteActor_home" />
    </div> -->

    <Messages
      :msg_success="msg_success"
      :msg_error="msg_error"
      :msg_warning="msg_warning"
    />
  </div>
</template>

<script>
import Consumers from "../components/lists/Consumers";
import Files from "../components/lists/Files";
import Upload from "../components/functions/Upload";
import Registration from "../components/functions/Registration";
import ModInfo from "../components/functions/ModInfo";
// import DeleteActor from "../components/functions/DeleteActor";
import Messages from "../components/layout/Messages";

import { messagesMixin, sectionsMixin } from "../utils/utils";

import axios from "axios";
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "jwtToken"
)}`;

export default {
  name: "Uploader-page",
  components: {
    Consumers,
    Files,
    Upload,
    Registration,
    ModInfo,
    // DeleteActor,
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
    };
  },
  // watch: {
  // },
  methods: {
    showFiles(consUsername) {
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
          this.showMsg(err);
        });
    },
    registration_home(frase) {
      this.showMsg(frase);
    },
    modInfo_home(frase) {
      this.showMsg(frase);
    },
    upload_home(frase) {
      this.showMsg(frase); //TODO se è ok devo mandare un messaggio che bisogna riaggiornare la pagina per vedere i file appena caricato
    },
    // deleteActor_home(frase) {
    //   this.showMsg(frase);
    // },
  },
  created() {
    axios
      .get(`${process.env.VUE_APP_APIROOT}/list/consumers`)
      .then((res) => (this.consumers = res.data))
      .catch((err) => this.showMsg(err));

    //uso la sessione in corso per reperire subito TUTTI i files che sono stati elargiti dall'uploader che è loggato
    axios
      .get(`${process.env.VUE_APP_APIROOT}/list/filesUploader`)
      .then((res) => (this.filesUploader = res.data))
      .catch((err) => this.showMsg(err));
  },
};
</script>
