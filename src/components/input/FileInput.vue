<template>
  <b-container>
    <!-- <legend>File</legend> -->
    <b-form-group id="file-group" label="File:" label-for="file">
      <b-form-file
        @change.native="trasf64"
        id="file"
        type="file"
        name="file"
        v-model="file"
        required
      />
    </b-form-group>

    <b-form-group
      id="nameFile-group"
      label="Nome del file:"
      label-for="nameFile"
    >
      <b-form-input
        @change.native="change_info"
        id="nameFile"
        type="text"
        name="nameFile"
        v-model="nameFile"
        placeholder="name of file"
      />
    </b-form-group>

    <b-form-group id="hashtag-group" label="Hashtag:" label-for="hashtag">
      <b-form-input
        @change.native="change_info"
        id="hashtag"
        type="text"
        name="hashtag"
        v-model="hashtag"
        placeholder="hashtag"
      />
    </b-form-group>
  </b-container>
</template>

<script>
import { changeInfoMixin } from "@/utils/utils";

export default {
  name: "FileInput",
  props: ["file", "nameFile", "hashtag"],
  mixins: [changeInfoMixin],
  watch: {
    file: function() {
      const valoreFile = { nameProp: "file", valueProp: this.file };
      this.$emit("change-info", valoreFile);
    },
  },
  methods: {
    trasf64(imgObj) {
      const reader = new FileReader();
      reader.onload = (elem) => {
        this.file = elem.target.result.replace(/^data:.+;base64,/, "");
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
      reader.readAsDataURL(imgObj.target.files[0]);

      let nameObject = imgObj.target.files[0].name;
      let lastDot = nameObject.lastIndexOf(".");
      const valoreExt = {
        nameProp: "extension",
        valueProp: nameObject.substring(lastDot),
      };
      this.$emit("change-info", valoreExt);
      //https://stackoverflow.com/questions/43708127/javascript-get-the-filename-and-extension-from-input-type-file
    },
  },
};
</script>

<style></style>
