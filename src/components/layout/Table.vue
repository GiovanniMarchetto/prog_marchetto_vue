<template>
  <b-container fluid>
    <b-row>
      <b-col sm="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          first-number
          last-number
          prev-text="Prev"
          next-text="Next"
        ></b-pagination
      ></b-col>
      <b-col sm="4" class="my-1">
        <b-form-group
        label="Per page:"
          label-for="per-page-select"
        label-cols-sm="3"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <!-- <b-col sm="4">
        <b-button variant="info" @click="nonStacked" class="my-1"
          >Tipologia tabella</b-button
        ></b-col
      > -->
    </b-row>

    <b-table
      striped
      head-variant="dark"
      table-variant="secondary"
      sticky-header="600px"
      responsive
      :current-page="currentPage"
      :per-page="perPage"
      :items="items"
      :fields="fields"
      :tbody-tr-class="highlightNew"
    >
      <template #cell(logo)="row">
        <b-img
          v-bind="logoProps"
          :src="`url(${row.item.logo})`"
          alt="Logo uploader"
          style=""
        ></b-img
      ></template>

      <template #cell(actions)="row">
        <b-button
          v-if="details === 'listConsumers' || details === 'listUploaders' || details === 'listResume'"
          @click="row.toggleDetails"
        >
          {{ row.detailsShowing ? "Hide" : "Show" }} Details
        </b-button>
        <b-button
          variant="info"
          v-if="details === 'listConsumers'"
          @click="$emit('cons-files', row.item.username)"
          >Mostra File</b-button
        >

        <b-button
          v-if="details === 'listUploaders'"
          variant="info"
          @click="$emit('upl-files', row.item.username)"
          >Mostra File</b-button
        >
        <b-button
          v-if="details === 'listFilesUploader'"
          @click="$emit('download-file', row.item.id)"
        >
          Download
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Name:</b></b-col>
            <b-col v-if="details === 'listResume'">{{
              row.item.nameUploader
            }}</b-col>
            <b-col
              v-if="details === 'listConsumers' || details === 'listUploaders'"
              >{{ row.item.name }}</b-col
            >
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Email:</b></b-col>
            <b-col v-if="details === 'listResume'">{{
              row.item.emailUploader
            }}</b-col>
            <b-col
              v-if="details === 'listConsumers' || details === 'listUploaders'"
              >{{ row.item.email }}</b-col
            >
          </b-row>
        </b-card>
      </template>
    </b-table>

    <div v-if="items.length == 0"><p>Nessun elemento</p></div>
  </b-container>
</template>

<script>
export default {
  name: "Table",
  props: ["items", "fields", "details"],
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Troppi" }],
      logoProps: {
        rounded: "circle",
      },
    };
  },
  methods: {
    highlightNew(item, type) {
      if (!item || type !== "row") return;
      if (item.dataVisualizzazione === "") return "table-warning";
    },
    // nonStacked() {
    //   //todo: lasciare?
    //   console.log("Sono qua");
    //   let x = document.getElementById("tabellaT");
    //   let classeVoluta = " b-table-stacked";
    //   if (x.className.includes(classeVoluta))
    //     x.className = x.className.replace(classeVoluta, "");
    //   else x.className = x.className.concat(classeVoluta);
    // },
  },
  computed: {
    totalRows() {
      return this.items.length;
    },
  },
};
</script>

<style scoped>
.btn {
  margin: 0px;
}
img {
  height: 5em;
  width: 5em;
}
</style>
