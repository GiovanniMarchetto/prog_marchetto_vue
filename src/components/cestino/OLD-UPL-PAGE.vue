<template>
  <div>
    <!-- <FooterActions :ruolo="ruolo" @reg-evento="registration_home" @upload-evento="upload_home"/> -->

    <h1>OLD-UPL-PAGECiao uploader!</h1>

        <!-- <b-table striped hover :items="consumers" :fields="fields">
          <template #cell(actions)="row">
            <b-button
            variant="info"
              @click="allerta(row.item.username)"
              class="mr-1"
            >
              Allerta
            </b-button>
          </template>
        </b-table> -->
        


        <!--<b-tabs content-class="mt-3">
      <b-tab title="Lista consumer/file" active>
        <div v-show="consumerScelto == null">
          <h2>Lista Consumer</h2>
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
      </b-tab>

      <b-tab title="Creare Consumer" @click="roleRegistrazione = 'consumer'">
        <Registration
          :potere="ruolo"
          :role="roleRegistrazione"
          @registrazione="registration_home"
        />
      </b-tab>

      <b-tab title="Modifica Consumer" @click="roleRegistrazione = 'consumer'">
        <ModInfo
          :potere="ruolo"
          :role="roleRegistrazione"
          @modInfo="modInfo_home"
        />
      </b-tab>
      <b-tab title="Modifica Uploader" @click="roleRegistrazione = 'uploader'">
        <ModInfo
          :potere="ruolo"
          :role="roleRegistrazione"
          @modInfo="modInfo_home"
        />
      </b-tab>

      <b-tab title="Carica nuovo file">
        <Upload @upload-evento="upload_home" />
      </b-tab>

      <b-tab title="Eliminazione Consumer">
        <DeleteActor :potere="ruolo" @deleteActor="deleteActor_home" />
      </b-tab>
    </b-tabs>-->
  </div>
</template>

<script>
// import Consumers from "../components/lists/Consumers";
// import Files from "../components/lists/Files";
// import Upload from "../components/functions/Upload";
// import Registration from "../components/functions/Registration";
// import ModInfo from "../components/functions/ModInfo";
// import DeleteActor from "../components/functions/DeleteActor";
// import axios from "axios";
// axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
//   "jwtToken"
// )}`;

// export default {
//   name: "Uploader-page",
//   components: {
//     Consumers,
//     Files,
//     Upload,
//     Registration,
//     ModInfo,
//     DeleteActor,
//   },
//   data() {
//     return {
//       msg_errore: "",
//       mostraSezione: "",
//       ruolo: "uploader",
//       roleRegistrazione: "",
//       consumerScelto: null,
//       consumers: [],
//       filesUploader: [],
//       filesConsumer: [],
//       // fields:["username","name","actions"]
//     };
//   },
//   watch: {
//     mostraSezione: function() {
//       this.msg_errore = "";
//     },
//     // msg_errore: function() {
//     //   var x = document.getElementById("snackbar");
//     //   if (this.msg_errore != "") {
//     //     x.className = "show";
//     //     // setTimeout(function() {
//     //     //   x.className = x.className.replace("show", "");
//     //     // }, 3000);
//     //   } else {
//     //     x.className = x.className.replace("show", "");
//     //   }
//     // },
//   },
//   methods: {
//     // allerta(prova){alert(prova)},

//     showMsg(frase) {
//       this.$emit(frase);
//       if (frase.startsWith("ERR")) this.msg_error = frase;
//       else this.msg_success = frase;

//       setTimeout(() => {
//         this.msg_error = "";
//         this.msg_success = "";
//       }, 5000);
//     },
//     showSezione(sezione) {
//       this.mostraSezione = sezione;
//     },
//     showConsumers() {
//       this.consumerScelto = null;
//     },
//     showFiles(consUsername) {
//       this.filesConsumer = null;
//       this.filesConsumer = this.filesUploader.filter(
//         (file) => file.usernameCons === consUsername
//       );
//       this.consumerScelto = consUsername;
//     },
//     deleteAct(id) {
//       let tipo;
//       if (this.consumerScelto === null) tipo = "attori";
//       else tipo = "files";

//       axios
//         .delete(`${process.env.VUE_APP_APIROOT}/${tipo}/delete`, { id })
//         .then((res) => {
//           this.showMsg(res.data);
//         })
//         .catch((err) => {
//           this.showMsg(err);
//         });
//     },
//     registration_home(frase) {
//       this.showMsg(frase);
//     },
//     modInfo_home(frase) {
//       this.showMsg(frase);
//     },
//     upload_home(newFile) {
//       const {
//         file,
//         nameFile,
//         hashtag,
//         usernameCons,
//         nameCons,
//         emailCons,
//       } = newFile;
//       axios
//         .post(`${process.env.VUE_APP_APIROOT}/files/upload`, {
//           file,
//           nameFile,
//           hashtag,
//           usernameCons,
//           nameCons,
//           emailCons,
//         })
//         .then((res) => {
//           this.showMsg(res.data);
//         })
//         .catch((err) => {
//           this.showMsg(err);
//         });
//     },
//     deleteActor_home(frase) {
//       this.showMsg(frase);
//     },
//   },
//   created() {
//     axios
//       .get(`${process.env.VUE_APP_APIROOT}/list/consumers`)
//       .then((res) => (this.consumers = res.data))
//       .catch((err) => (this.showMsg(err)));

//     //uso la sessione in corso per reperire subito TUTTI i files che sono stati elargiti dall'uploader che è loggato
//     axios
//       .get(`${process.env.VUE_APP_APIROOT}/list/filesUploader`)
//       .then((res) => (this.filesUploader = res.data))
//       .catch((err) => (this.showMsg(err)));

//     console.log(process.env.VUE_APP_APIROOT);
//   },
// };
</script>