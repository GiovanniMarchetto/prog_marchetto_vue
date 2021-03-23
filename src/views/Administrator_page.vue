<template>
  <div>
    <Navbar
      :potere="ruolo"
      :nomePrimaLista="'Resoconto'"
      :nomeSecondaLista="'Amministratori'"
      @mostraSezione="showSezione"
      @ruoloForm="modificaRuoloForm"
    />

    <div v-show="sezione == ''">
      <h2>Resoconto uploader</h2>

      <h3>
        Resoconto dal {{ dateFromSelected.substring(8, 10) }}-{{
          dateFromSelected.substring(5, 7)
        }}-{{ dateFromSelected.substring(0, 4) }} al
        {{ dateToSelected.substring(8, 10) }}-{{
          dateToSelected.substring(5, 7)
        }}-{{ dateToSelected.substring(0, 4) }}
      </h3>

      <Table
        :items="resume"
        :fields="fieldsResume"
        :caricamentoDati="caricamentoDati"
      />

      <b-form
        @submit.prevent="dataFilter"
        @reset.prevent="datesForLastMonth"
      >
        <DatesResume :dateFrom.sync="dateFrom" :dateTo.sync="dateTo" />
        <b-button type="submit" variant="primary">Resoconto</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>

    <div v-show="sezione == 'secondaLista'">
      <h2>Lista degli Amministratori</h2>
      <Table
        :items="administrators"
        :fields="fieldsListAdministrators"
        :caricamentoDati="caricamentoDati"
      />
    </div>

    <div v-show="sezione == 'registration'">
      <Registration
        :potere="ruolo"
        :role="ruoloForm"
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

    <div v-show="sezione == 'delete'">
      <Delete
        :potere="ruolo"
        :attoriOptions="attoriOptions"
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
import Registration from "../components/functions/Registration";
import ModInfo from "../components/functions/ModInfo";
import Delete from "../components/functions/Delete";
import Messages from "../components/layout/Messages";
import DatesResume from "../components/input/DatesResume";

import { messagesMixin, sectionsMixin } from "../utils/utils";

import axios from "axios";
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "jwtToken"
)}`;

export default {
  name: "Administrator_page",
  components: {
    Navbar,
    Table,
    Registration,
    ModInfo,
    Delete,
    DatesResume,
    Messages,
  },
  mixins: [messagesMixin, sectionsMixin],
  data() {
    return {
      ruolo: "administrator",
      resume: [],
      administrators: [],
      dateFrom: "",
      dateTo: "",
      dateFromSelected: "",
      dateToSelected: "",
      ruoloForm: "",
      fieldsResume: [
        "name",
        { key: "numDocCaricati", label: "#doc", sortable: true },
        {
          key: "numConsDiversi",
          label: "#cons",
          sortable: true,
        },
        "details",
      ],
      fieldsListAdministrators: ["name", "details"],
      caricamentoDati: false,
    };
  },
  computed: {
    attoriOptions: function() {
      let listAttori = [];
      this.resume.forEach((el) => {
        listAttori.push(el.username);
      });
      this.administrators.forEach((el) => {
        listAttori.push(el.username);
      });
      return listAttori;
    },
  },
  methods: {
    modificaRuoloForm(ruoloInput) {
      this.ruoloForm = ruoloInput;
    },

    registrazione_utente_home(nuovoUtente) {
      const { username, name, email, role, logo } = nuovoUtente;
      if (role === "administrator") {
        const infoAdmin = {
          username: username,
          name: name,
          email: email,
          logo: logo,
        };
        this.administrators.push(infoAdmin);
      } else {
        const resumeElem = {
          username: username,
          name: name,
          email: email,
          numDocCaricati: 0,
          numConsDiversi: 0,
        };
        this.resume.push(resumeElem);
      }
      this.attoriOptions.push(username);
    },

    modInfo_utente_home(modUtente) {
      const { utente, role } = modUtente;
      if (role === "administrator") {
        let index = this.resume.findIndex(
          (el) => el.username === utente.username
        );
        if (index !== -1) {
          this.administrators[index].name = utente.name;
          this.administrators[index].email = utente.email;
        }
      } else {
        let index = this.resume.findIndex(
          (el) => el.username === utente.username
        );
        this.resume[index].name = utente.name;
        this.resume[index].email = utente.email;
      }
    },

    delete_username_home(usernameUpl) {
      this.resume = this.resume.filter((el) => el.username !== usernameUpl);
      this.attoriOptions = this.attoriOptions.filter(
        (el) => el !== usernameUpl
      );
    },

    dataFilter() {
      this.caricamentoDati = true;
      axios
        .post(`${process.env.VUE_APP_APIROOT}/list/resumeForAdmin`, {
          from: this.dateFrom,
          to: this.dateTo,
        })
        .then((res) => {
          this.resume = res.data;
          this.dateFromSelected = this.dateFrom;
          this.dateToSelected = this.dateTo;
          this.showMsg("Resoconto fornito");
        })
        .catch((err) => this.showMsg(err.toString()))
        .finally(() => {
          this.caricamentoDati = false;
        });
    },
    datesForLastMonth() {
      const today = new Date();
      if (today.getMonth() == 0) {
        this.dateFrom = today.getFullYear() - 1 + "-12-01";
      } else if (today.getMonth() > 9) {
        this.dateFrom =
          today.getFullYear() + "-" + today.getMonth() + "-" + "01";
      } else {
        this.dateFrom =
          today.getFullYear() + "-0" + today.getMonth() + "-" + "01";
      }

      this.dateTo = today.toISOString().substring(0, 8) + "01";
    },
  },
  created() {
    this.datesForLastMonth();
    this.dataFilter();
    this.caricamentoDati = true;
    axios
      .get(`${process.env.VUE_APP_APIROOT}/list/administrators`)
      .then((res) => (this.administrators = res.data))
      .catch((err) => this.showMsg(err.toString()))
      .finally(() => {
        this.caricamentoDati = false;
      });
  },
};
</script>
