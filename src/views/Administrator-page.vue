<template>
  <div>
    <h1>Ciao amministratore!</h1>

    <!-- <div v-if="msg_error" class="alert">{{ msg_error }}</div> -->
    <!-- <br /> -->

    <h2 id="pan">Pannello di controllo</h2>
    <!-- <div class="nav2">
        <b-button @click="showSezione('registration')" variant="outline-dark"
          >Crea Attore</b-button
        >
        <button @click="showSezione('modInfo')">
          Modifica Attore
        </button>
        <button @click="showSezione('')">Nascondi opzioni</button>
      </div> -->
    <b-nav pills justified class="nav2">
      <b-nav-item @click="showSezione('')">Resoconto</b-nav-item>
      <b-nav-item-dropdown text="Crea Attore">
        <b-dropdown-item
          @click="
            showSezione('registration'), (roleRegistrazione = 'administrator')
          "
          >Administrator</b-dropdown-item
        >
        <b-dropdown-item
          @click="showSezione('registration'), (roleRegistrazione = 'uploader')"
          >Uploader</b-dropdown-item
        >
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Modifica Attore">
        <b-dropdown-item
          @click="showSezione('modInfo'), (roleRegistrazione = 'administrator')"
          >Administrator</b-dropdown-item
        >
        <b-dropdown-item
          @click="showSezione('modInfo'), (roleRegistrazione = 'uploader')"
          >Uploader</b-dropdown-item
        >
      </b-nav-item-dropdown>
      <b-nav-item @click="showSezione('deleteActor')"
        >Eliminazione Attore</b-nav-item
      >
    </b-nav>

    <div v-show="sezione == ''">
      <h2>Resoconto uploader</h2>
      <b-form inline @submit.prevent="dataFilter">
        <b-form-input
          name="dateFrom"
          type="date"
          v-model="dateFrom"
          placeholder="From"
          required
        ></b-form-input>
        <b-form-input
          name="dateTo"
          type="date"
          v-model="dateTo"
          placeholder="To"
          required
        ></b-form-input>
        <b-button type="submit" variant="secondary">Resoconto</b-button>
      </b-form>

      <h3>
        Periodo selezionato(anno-mese-giorno): dal {{ dateFromSelected }} al
        {{ dateToSelected }}
      </h3>
      <p>
        I file caricati il giorno d'inizio del periodo sono inclusi, quelli
        caricati il giorno di conclusione del periodo sono esclusi.
      </p>
      <Resume :resume="resume" />
      <!-- <Resume :resume="resume" @del-upl="deleteUploader" /> -->
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

    <div v-else-if="sezione == 'deleteActor'">
      <DeleteActor :potere="ruolo" @deleteActor="deleteActor_home" />
    </div>

    <br />
    <Messages :msg_success="msg_success" :msg_error="msg_error" />
  </div>
</template>

<script>
import Registration from "../components/functions/Registration";
import ModInfo from "../components/functions/ModInfo";
import DeleteActor from "../components/functions/DeleteActor";
import Resume from "../components/lists/Resume";
import Messages from "../components/layout/Messages";
import axios from "axios";
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "jwtToken"
)}`;

export default {
  name: "Administrator-page",
  components: {
    Registration,
    ModInfo,
    DeleteActor,
    Resume,
    Messages
  },
  data() {
    return {
      ruolo: "administrator",
      resume: [],
      dateFrom: "",
      dateTo: "",
      dateFromSelected: "",
      dateToSelected: "",
      roleRegistrazione: "",
    };
  },
  methods: {
    registration_home(frase) {
      this.showMsg(frase);
    },

    modInfo_home(frase) {
      this.showMsg(frase);
    },

    deleteActor_home(frase) {
      this.showMsg(frase);
    },

    dataFilter() {
      axios
        .post(`${process.env.VUE_APP_APIROOT}/list/resumeForAdmin`, {
          from: this.dateFrom,
          to: this.dateTo,
        })
        .then((res) => {
          this.resume = res.data;
          this.dateFromSelected = this.dateFrom;
          this.dateToSelected = this.dateTo;
        })
        .catch((err) => (this.msg_error = err));
    },
  },
  created() {
    console.log(process.env.VUE_APP_APIROOT);

    const today = new Date();

    if (today.getMonth() == 0) {
      this.dateFrom = today.getFullYear() - 1 + "-12-01";
    } else if (today.getMonth() > 9) {
      this.dateFrom = today.getFullYear() + "-" + today.getMonth() + "-" + "01";
    } else {
      this.dateFrom =
        today.getFullYear() + "-0" + today.getMonth() + "-" + "01";
    }

    if (today.getMonth() < 9) {
      this.dateTo =
        today.getFullYear() + "-0" + (today.getMonth() + 1) + "-" + "01";
    } else {
      this.dateTo =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + "01";
    }

    axios
      .post(`${process.env.VUE_APP_APIROOT}/list/resumeForAdmin`, {
        from: this.dateFrom,
        to: this.dateTo,
      })
      .then((res) => {
        this.resume = res.data;
        this.dateFromSelected = this.dateFrom;
        this.dateToSelected = this.dateTo;
      })
      .catch((err) => (this.msg_error = err));
  },
};
</script>

<style scoped>
#pan {
  padding: 10px;
  color: aliceblue;
  background: #2c3e50;
}
/*
.buu {
  padding: 20px;
  border: transparent;
  font-weight: bold;
  color: aliceblue;
  background-color: #2c3e50;
}

.buu:hover {
  background-color: aquamarine;
  color: #2c3e50;
} */
</style>
