<template>
  <b-table
    striped
    head-variant="dark"
    sticky-header="600px"
    responsive
    :items="resume"
    :fields="fields"
  >
    <template #cell(details)="row">
      <b-button @click="row.toggleDetails">
        {{ row.detailsShowing ? "Hide" : "Show" }}
      </b-button>
    </template>

    <template #row-details="row">
      <b-card>
        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right"><b>Name:</b></b-col>
          <b-col>{{ row.item.nameUploader }}</b-col>
        </b-row>

        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right"><b>Email:</b></b-col>
          <b-col>{{ row.item.emailUploader }}</b-col>
        </b-row>
      </b-card>
    </template>
  </b-table>
</template>

<script>
export default {
  name: "Resume",
  props: ["resume"],
  data() {
    return {
      fields: [
        "uploader",
        {
          key: "numDocCaricati",
          sortable: true,
        },
        {
          key: "numConsDiversi",
          sortable: true,
        },
        "details",
      ],
    };
  },
};
</script>

<style></style>
