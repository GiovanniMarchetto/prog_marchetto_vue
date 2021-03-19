<template>
<b-form-group>
  <!-- <b-container> -->
    <!-- <b-form-group id="dateFrom-group" label="Dal: " label-for="dateFrom"> -->
      <b-form-input
        id="dateFromInput"
        name="dateFromInput"
        type="date"
        v-model="dateFromInput"
        required
      ></b-form-input>
    <!-- </b-form-group> -->

    <!-- <b-form-group id="dateTo-group" label="Al: " label-for="dateTo"> -->
      <b-form-input
        id="dateToInput"
        name="dateToInput"
        type="date"
        v-model="dateToInput"
        required
      ></b-form-input>
    </b-form-group>
  <!-- </b-container> -->
</template>

<script>

export default {
  name: "DatesResume",
  props: ["dateFrom", "dateTo"],
  computed: {
        dateFromInput: {
            get: function(){
                return this.dateFrom;
            },
            set: function(newValue){
                this.$emit('update:dateFrom', newValue)
            }   
        },
        dateToInput: {
            get: function(){
                return this.dateTo;
            },
            set: function(newValue){
                this.$emit('update:dateTo', newValue)
            }   
        },
    },
};
</script>

<style></style>
