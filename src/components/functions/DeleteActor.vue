<template>
  <div>
    <h2>Eliminazione attore</h2>
    <form @submit.prevent="deleteActor">
      <b-form-input
        @change="change"
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
      username: ""
    };
  },
  methods: {
    deleteActor() {
      axios
        .delete(`${process.env.VUE_APP_APIROOT}/attori/delete`, {
          username: this.username
        })
        .then((res) => {
          console.log(res);
          if (!res.data.startsWith("ERR")) {
            this.$emit(
              "deleteActor",
              "eliminazione attore " +
                this.username +
                " eseguita con successo"
            );
          } else {
            this.$emit("deleteActor", "ERR - " + res.data);
          }
        })
        .catch((err) => {
          this.$emit("deleteActor", "ERR(esterno) - " + err);
        });
    },
  },
};
</script>
