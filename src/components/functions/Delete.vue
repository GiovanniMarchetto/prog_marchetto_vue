<template>
  <div>
    <h2>Eliminazione</h2>

    <b-container fluid>
      <h3>Elimina attore</h3>
      <b-form @submit.prevent="deleteActor">
        <label for="username">Username attore da eliminare</label>
        <b-form-input
          list="attori-list"
          id="username"
          type="text"
          name="username"
          v-model="username"
          placeholder="username"
          required
        />
        <b-form-datalist
          id="attori-list"
          :options="attoriOptions"
        ></b-form-datalist>

        <b-button type="submit" variant="danger">Elimina utente</b-button>
      </b-form>
      <p>
        NB: non puoi cancellare il tuo account
      </p>
    </b-container>

    <b-container fluid v-if="potere === 'uploader'">
      <h3>Elimina file</h3>

      <b-form @submit.prevent="deleteFile">
        <label for="fileId">Identificativo file da eliminare</label>
        <b-form-input
          list="fileId-list"
          id="fileId"
          type="text"
          name="fileId"
          v-model="fileId"
          placeholder="id file"
          required
        ></b-form-input>
        <b-form-datalist
          id="fileId-list"
          :options="fileOptions"
        ></b-form-datalist>

        <b-button type="submit" variant="danger">Elimina file</b-button>
      </b-form>
      <p>
        NB: puoi cancellare solo i file da te caricati
      </p>
    </b-container>
    <Spinner :attesa="attesa" />
  </div>
</template>

<script>
import Spinner from "@/components/layout/Spinner";
import axios from "axios";
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "jwtToken"
)}`;

export default {
  name: "Delete",
  components: { Spinner },
  props: ["potere", "attoriOptions", "fileOptions"],
  data() {
    return {
      username: "",
      fileId: "",
      attesa: false,
    };
  },
  methods: {
    deleteActor() {
      this.attesa = true;
      axios
        .delete(`${process.env.VUE_APP_APIROOT}/attori/delete/${this.username}`)
        .then((res) => {
          this.$emit("delete_username", this.username);
          this.username = "";
          this.$emit("delete", res.data);
        })
        .catch((err) => {
          this.$emit("delete", err.response.data);
        })
        .finally(() => {
          this.attesa = false;
        });
    },
    deleteFile() {
      this.attesa = true;
      axios
        .delete(`${process.env.VUE_APP_APIROOT}/files/delete/${this.fileId}`)
        .then((res) => {
          this.$emit("delete_file", this.fileId);
          this.fileId = "";
          this.$emit("delete", res.data);
        })
        .catch((err) => {
          this.$emit("delete", err.err.response.data);
        })
        .finally(() => {
          this.attesa = false;
        });
    },
  },
};
</script>
