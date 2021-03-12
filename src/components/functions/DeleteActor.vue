<template>
  <div>
    <h2>Eliminazione attore</h2>
    <form @submit.prevent="deleteActor">
      <b-form-input
        id="username"
        type="text"
        name="username"
        v-model="username"
        placeholder="username"
        required
      />
      <b-button type="submit" variant="danger">Eliminazione</b-button>
    </form>
    <p>
      NB: non puoi cancellare il tuo account
    </p>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
  "jwtToken"
)}`;

export default {
  name: "DeleteActor",
  props: ["potere"],
  data() {
    return {
      username: "",
    };
  },
  methods: {
    deleteActor() {
      axios
        .delete(`${process.env.VUE_APP_APIROOT}/attori/delete/${this.username}`)
        .then((res) => {
          if (!res.data.startsWith("ERR")) {
            this.$emit("delete_username", this.username);
            this.username = "";
          }
          this.$emit("deleteActor", res.data);
        })
        .catch((err) => {
          this.$emit("deleteActor", "ERR(esterno) - " + err);
        });
    },
  },
};
</script>
