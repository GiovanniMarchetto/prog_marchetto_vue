<template>
  <b-table
    striped
    head-variant="dark"
    sticky-header="600px"
    responsive
    :items="uploaders"
    :fields="fields"
  >
    <template #cell(logo)="row">
      <b-img
        v-bind="logoProps"
        :src="`${row.item.logo}`"
        alt="Logo uploader"
        style=""
      ></b-img
    ></template>

    <template #cell(actions)="row">
      <b-button @click="row.toggleDetails">
        {{ row.detailsShowing ? "Hide" : "Show" }} Details
      </b-button>
      <b-button variant="info" @click="$emit('upl-files', row.item.username)"
        >Mostra File caricati da questo uploader</b-button
      >
    </template>

    <template #row-details="row">
      <b-card>
        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right"><b>Name:</b></b-col>
          <b-col>{{ row.item.name }}</b-col>
        </b-row>

        <b-row class="mb-2">
          <b-col sm="3" class="text-sm-right"><b>Email:</b></b-col>
          <b-col>{{ row.item.email }}</b-col>
        </b-row>
      </b-card>
    </template>
  </b-table>
</template>

<script>
export default {
  name: "Uploaders",
  components: {
    // UploaderItem,
  },
  props: ["uploaders"],
  data() {
    return {
      fields: ["logo", "username", "actions"],
      logoProps: {
        rounded: "circle",
      },
    };
  },
};
</script>

<style scoped>
img {
  height: 5em;
  width: 5em;
}
</style>
