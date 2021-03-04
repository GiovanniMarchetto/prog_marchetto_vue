<template>
  <b-form-group
  id="logo-group" label="Logo:" label-for="logo">
    <b-form-file
      @change.native="trasf64"
      id="logo"
      name="logo"
      placeholder="Choose a file or drop it here..."
      accept="image/*"
    />

    <figure v-show="logo != ''">
      <b-img
        rounded
        :src="`${logo}`"
        alt="Anteprima Logo"
        style="width:300px;height:300px;"
      />
      <figcaption>Anteprima logo</figcaption>
    </figure>
  </b-form-group>
</template>

<script>
export default {
  name: "Logo",
  props: ["required"],
  data() {
    return {
      logo: "",
    };
  },
  watch: {
    logo: function(val) {
      const valore = { nameProp: "logo", valueProp: val };
      this.$emit("change-info", valore);
    },
  },
  methods: {
    trasf64(imgObj) {
      const reader = new FileReader();
      reader.onload = (elem) => {
        this.logo = elem.target.result;
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
      reader.readAsDataURL(imgObj.target.files[0]);
    },
  },
  mounted() {
    if (this.required)
      document.getElementById("logo").setAttribute("required", "true");
  },
};
</script>

<style>
figure {
  max-width: 100%;
}
img {
  background-color: black;
  width: 10em;
  height: 10em;
}
</style>
