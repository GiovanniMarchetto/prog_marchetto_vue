<template>
<b-form-group>
  <!-- <b-container> -->
    <!-- <b-form-group id="dateFrom-group" label="Dal: " label-for="dateFrom"> -->
      <b-form-input
        @change.native="change_info"
        id="dateFrom"
        name="dateFrom"
        type="date"
        v-model="dateFrom"
        required
      ></b-form-input>
    <!-- </b-form-group> -->

    <!-- <b-form-group id="dateTo-group" label="Al: " label-for="dateTo"> -->
      <b-form-input
        @change.native="change_info"
        id="dateTo"
        name="dateTo"
        type="date"
        v-model="dateTo"
        required
      ></b-form-input>
    </b-form-group>
  <!-- </b-container> -->
</template>

<script>
import { changeInfoMixin } from "@/utils/utils";

export default {
  name: "DatesResume",
  props: ["dateFrom", "dateTo"],
  mixins: [changeInfoMixin],
};
</script>

<style></style>
