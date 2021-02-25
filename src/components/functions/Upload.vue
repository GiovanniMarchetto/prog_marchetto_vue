<template>
  <div>
    <h1>Caricamento file</h1>
    <b-form @submit.prevent="upload">
      <b-form-group>
        <legend>File</legend>
        <!-- <label for="file">File:</label> -->
        <b-form-file
          id="file"
          type="file"
          name="file"
          @change.native="trasf64"
          required
        />

        <label for="nameFile">Nome del file:</label>
        <b-form-input
          id="nameFile"
          type="text"
          name="nameFile"
          placeholder="name of file"
        />

        <label for="hashtag">Hashtag:</label>
        <b-form-input id="hashtag" type="text" name="hashtag" placeholder="hashtag" />
      </b-form-group>

      <b-form-group>
        <legend>Dati Consumer</legend>
        <label for="usernameCons">Username:</label>
        <b-form-input
          id="usernameCons"
          type="text"
          name="usernameCons"
          required
          placeholder="username consumer"
        />
        <label for="nameCons">Nome:</label>
        <b-form-input
          id="nameCons"
          type="text"
          name="nameCons"
          placeholder="name consumer"
        />
        <label for="emailCons">Email:</label>
        <b-form-input
          id="emailCons"
          type="email"
          name="emailCons"
          placeholder="email consumer"
        />
      </b-form-group>

      <b-button type="submit" variant="success">Upload</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      file: "",
      nameFile: "",
      hashtag: "",
      usernameCons: "",
      nameCons: "",
      emailCons: "",
    };
  },
  methods: {
    upload() {
      const newFile = {
        file: this.file,
        nameFile: this.nameFile,
        hashtag: this.hashtag,
        usernameCons: this.usernameCons,
        nameCons: this.nameCons,
        emailCons: this.emailCons,
      };
      this.$emit("upload-evento", newFile);
    },

    trasf64(imgObj) {
      const reader = new FileReader();
      reader.onload = (elem) => {
        this.file = elem.target.result;
      };
      reader.readAsDataURL(imgObj.target.files[0]);
    },
  },
};
</script>

<style></style>
