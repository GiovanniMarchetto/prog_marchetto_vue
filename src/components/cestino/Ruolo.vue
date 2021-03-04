<template>
  <b-form-group label="Ruolo">
    <!-- <legend></legend> -->
    <!-- <label for="administrator">
      <input
        @change="change"
        type="radio"
        name="role"
        v-model="role"
        value="administrator"
      />
      Administrator</label
    > -->
    <b-form-radio
    @change.native="change"
      v-model="role"
      name="role"
      value="administrator"
      >Administrator</b-form-radio
    >
    <b-form-radio
    @change.native="change"
      v-model="role"
      name="role"
      value="uploader"
      >Uploader</b-form-radio
    >
<!-- :aria-describedby="ariaDescribedby" -->
  </b-form-group>
</template>

<script>
export default {
  name: "Ruolo",
  data() {
    return {
      role: "consumer",
    };
  },
  methods: {
    change(e) {
      const valore = { nameProp: e.target.name, valueProp: e.target.value };
      this.$emit("change-info", valore);
    },
  },
};
</script>

<style></style>
