<template>
  <b-form-group>
    <legend>File</legend>
    <!-- <label for="file">File:</label> -->
    <b-form-file
      @change.native="trasf64"
      id="file"
      type="file"
      name="file"
      v-model="file"
      required
    />

    <label for="nameFile">Nome del file:</label>
    <b-form-input
      @change.native="change"
      id="nameFile"
      type="text"
      name="nameFile"
      v-model="nameFile"
      placeholder="name of file"
    />

    <label for="hashtag">Hashtag:</label>
    <b-form-input
      @change.native="change"
      id="hashtag"
      type="text"
      name="hashtag"
      v-model="hashtag"
      placeholder="hashtag"
    />
  </b-form-group>
</template>

<script>
export default {
  name: "FileInput",
  data() {
    return {
      file: "",
      nameFile: "",
      hashtag: "",
    };
  },
  watch: {
    file: function() {
      const valore = { nameProp: "file", valueProp: this.file };
      this.$emit("change-info", valore);
    },
  },
  methods: {
    trasf64(imgObj) {
      const reader = new FileReader();
      reader.onload = (elem) => {
        this.file = elem.target.result;
      };
      reader.readAsDataURL(imgObj.target.files[0]);
    },
    change(e) {
      const valore = { nameProp: e.target.name, valueProp: e.target.value };
      this.$emit("change-info", valore);
    },
  },
};
</script>

<style></style>
