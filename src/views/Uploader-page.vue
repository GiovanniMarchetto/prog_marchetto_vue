<template>
  <div>
    <h1>Uploader {{ localStorage.getItem("nomeUtente") }} page</h1>

    <b-nav pills justified class="nav2">
      <b-nav-item @click="showSezione('')">Lista consumer/file</b-nav-item>
      <b-nav-item
        @click="showSezione('registration'), (roleRegistrazione = 'consumer')"
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
      <b-nav-item @click="showSezione('upload')">Carica nuovo file</b-nav-item>
      <b-nav-item @click="showSezione('deleteActor')"
        >Eliminazione Consumer</b-nav-item
      >
    </b-nav>

    <div v-show="sezione == ''">
      <div v-show="consumerScelto == null">
        <h2>Lista Consumer</h2>-->
        <Consumers
          v-bind:consumers="consumers"
          @cons-files="showFiles"
          @del-cons="deleteAct"
        />
      </div>
      <div v-show="consumerScelto != null">
        <h2>Lista Files di {{ consumerScelto }}</h2>
        <Files :files="filesConsumer" :ruolo="ruolo" @del-file="deleteAct" />
        <b-button @click="showConsumers()">
          Vedi tutti i consumers
        </b-button>
      </div>
    </div>
    <div v-if="sezione == 'registration'">
      <Registration
        :potere="ruolo"
        :role="roleRegistrazione"
        @registrazione="registration_home"
      />
    </div>
    <div v-else-if="sezione == 'modInfo'">
      <ModInfo
        :potere="ruolo"
        :role="roleRegistrazione"
        @modInfo="modInfo_home"
      />
    </div>
    <div v-else-if="sezione == 'upload'">
      <Upload @upload-evento="upload_home" />
    </div>
    <div v-else-if="sezione == 'deleteActor'">
      <DeleteActor :potere="ruolo" @deleteActor="deleteActor_home" />
    </div>

    <Messages :msg_success="msg_success" :msg_error="msg_error" />
  </div>
</template>

<script>
import Consumers from "../components/lists/Consumers";
import Files from "../components/lists/Files";
import Upload from "../components/functions/Upload";
import Registration from "../components/functions/Registration";
import ModInfo from "../components/functions/ModInfo";
import DeleteActor from "../components/functions/DeleteActor";
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
    DeleteActor,
  },
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
    showConsumers() {
      this.consumerScelto = null;
    },
    showFiles(consUsername) {
      this.filesConsumer = null;
      this.filesConsumer = this.filesUploader.filter(
        (file) => file.usernameCons === consUsername
      );
      this.consumerScelto = consUsername;
    },
    deleteAct(id) {
      let tipo;
      if (this.consumerScelto === null) tipo = "attori";
      else tipo = "files";

      axios
        .delete(`${process.env.VUE_APP_APIROOT}/${tipo}/delete`, { id })
        .then((res) => {
          this.showMsg(res.data);
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
    upload_home(newFile) {
      const {
        file,
        nameFile,
        hashtag,
        usernameCons,
        nameCons,
        emailCons,
      } = newFile;
      axios
        .post(`${process.env.VUE_APP_APIROOT}/files/upload`, {
          file,
          nameFile,
          hashtag,
          usernameCons,
          nameCons,
          emailCons,
        })
        .then((res) => {
          this.showMsg(res.data);
        })
        .catch((err) => {
          this.showMsg(err);
        });
    },
    deleteActor_home(frase) {
      this.showMsg(frase);
    },
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

    console.log(process.env.VUE_APP_APIROOT);
  },
};
</script>
