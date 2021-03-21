<template>
  <b-container fluid>
    <b-form-group id="logoInput-group" label="Logo:" label-for="logoInput">
      <b-form-file
        @change.native="trasf64"
        id="logoInput"
        type="file"
        name="logoInput"
        v-model="logoInput"
        placeholder="Scegli un immagine o trascinala qui..."
        accept="image/*"
      />

      <figure v-show="logo">
        <b-img
          id="anteprima-logo"
          center
          rounded
          :src="`${logoStringInput}`"
          alt="Anteprima Logo"
        />
      </figure>
    </b-form-group>
  </b-container>
</template>

<script>
export default {
  name: "Logo",
  props: ["required", "logo"],
  data() {
    return {
      logoInput: null,
    };
  },
  methods: {
    trasf64(imgObj) {
      const reader = new FileReader();
      reader.onload = (elem) => {
        this.logoStringInput = elem.target.result;
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
      reader.readAsDataURL(imgObj.target.files[0]);
    },
  },
  computed: {
    logoStringInput: {
      get: function() {
        return this.logo;
      },
      set: function(newValue) {
        this.$emit("update:logo", newValue);
      },
    },
  },
  mounted() {
    if (this.required)
      document.getElementById("logoInput").setAttribute("required", "true");
  },
};
</script>

<style>
#anteprima-logo {
  margin: 10px;
  background-color: black;
  max-height: 300px;
  max-width: 300px;
  /* width: 10em;
  height: 10em; */
}
</style>
