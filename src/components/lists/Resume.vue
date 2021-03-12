<template>
  <b-container fluid>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      first-number
      last-number
      prev-text="Prev"
      next-text="Next"
    ></b-pagination>

    <b-table
      striped
      head-variant="dark"
      table-variant="secondary"
      sticky-header="600px"
      responsive
      :current-page="currentPage"
      :items="resume"
      :fields="fields"
    >
      <template #cell(details)="row">
        <b-button variant="light" @click="row.toggleDetails">
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
  </b-container>
</template>

<script>
export default {
  name: "Resume",
  props: ["resume"],
  data() {
    return {
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      fields: [
        "uploader",
        {
          key: "numDocCaricati",
          label: "#doc",
          sortable: true,
        },
        {
          key: "numConsDiversi",
          label: "#cons",
          sortable: true,
        },
        "details",
      ],
    };
  },
};
</script>

<style></style>
