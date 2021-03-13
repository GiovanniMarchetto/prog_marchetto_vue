<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand @click="showSezione('')"
        >Administrator page</b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="showSezione('')">Resoconto</b-nav-item>
          <b-nav-item-dropdown text="Crea Attore">
            <b-dropdown-item
              @click="
                showSezione('registration'),
                  (roleRegistrazione = 'administrator')
              "
              >Administrator</b-dropdown-item
            >
            <b-dropdown-item
              @click="
                showSezione('registration'), (roleRegistrazione = 'uploader')
              "
              >Uploader</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Modifica Attore">
            <b-dropdown-item
              @click="
                showSezione('modInfo'), (roleRegistrazione = 'administrator')
              "
              >Administrator</b-dropdown-item
            >
            <b-dropdown-item
              @click="showSezione('modInfo'), (roleRegistrazione = 'uploader')"
              >Uploader</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item @click="showSezione('delete')"
            >Eliminazione Attore</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div v-show="sezione == ''">
      <h2>Resoconto uploader</h2>

      <h3>
        Periodo selezionato (anno-mese-giorno): dal {{ dateFromSelected }} al
        {{ dateToSelected }}
      </h3>
      <p>
        I file caricati il giorno d'inizio del periodo sono inclusi, quelli
        caricati il giorno di conclusione del periodo sono esclusi.
      </p>
      <b-form
        inline
        @submit.prevent="dataFilter"
        @reset.prevent="datesForLastMonth"
        style="margin-bottom:10px"
      >
        <DatesResume
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          @change-info="change_home"
        />
        <b-button class="btn-inline" type="submit" variant="outline-primary"
          >Resoconto</b-button
        >
        <b-button class="btn-inline" type="reset" variant="outline-danger"
          >Reset</b-button
        >
      </b-form>

      <Table :items="resume" :fields="fieldsResume" :details="'listResume'" />
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

    <div v-show="sezione == 'delete'">
      <Delete
        :potere="ruolo"
        :attoriOptions="attoriOptions"
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
  name: "Administrator-page",
  components: {
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
      dateFrom: "",
      dateTo: "",
      dateFromSelected: "",
      dateToSelected: "",
      roleRegistrazione: "",
      fieldsResume: [
        "uploader",
        { key: "numDocCaricati", label: "#doc", sortable: true },
        {
          key: "numConsDiversi",
          label: "#cons",
          sortable: true,
        },
        "actions",
      ],
      attoriOptions: [],
    };
  },
  watch: {
    resume: function() {
      this.attoriOptions = [];
      this.resume.forEach((el) => {
        this.attoriOptions.push(el.uploader);
      });
    },
  },
  methods: {
    change_home(infos) {
      const { nameProp, valueProp } = infos;
      switch (nameProp) {
        case "dateFrom":
          this.dateFrom = valueProp;
          break;
        case "dateTo":
          this.dateTo = valueProp;
          break;
        default:
          break;
      }
    },
    registration_home(frase) {
      this.showMsg(frase);
    },

    modInfo_home(frase) {
      this.showMsg(frase);
    },

    delete_username_home(usernameUpl) {
      this.resume = this.resume.filter((el) => el.uploader !== usernameUpl);
    },

    delete_home(frase) {
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
          this.showMsg("Resoconto fornito");
        })
        .catch((err) => this.showMsg(err.toString()));
    },
    datesForLastMonth() {
      const today = new Date();
      //TODO: così mi sembra più semplice
      // let dataCorrente = new Date();
      //             let dataScritta =
      //               dataCorrente.toISOString().substring(0, 10) +
      //               " " +
      //               dataCorrente.toLocaleTimeString();
      if (today.getMonth() == 0) {
        this.dateFrom = today.getFullYear() - 1 + "-12-01";
      } else if (today.getMonth() > 9) {
        this.dateFrom =
          today.getFullYear() + "-" + today.getMonth() + "-" + "01";
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
    },
  },
  created() {
    this.datesForLastMonth();
    this.dataFilter();
  },
};
</script>
