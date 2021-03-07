<template>
  <b-table
    striped
    head-variant="dark"
    sticky-header="600px"
    responsive
    :items="resume"
    :fields="fields"
  >
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
      ],
    };
  },
};
</script>

<style></style>
