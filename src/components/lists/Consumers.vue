<template>
  <div>
    <b-table
      striped
      head-variant="dark"
      sticky-header="600px"
      responsive
      :items="consumers"
      :fields="fields"
    >
      <template #cell(actions)="row">
        <b-button @click="row.toggleDetails">
          {{ row.detailsShowing ? "Hide" : "Show" }} Details
        </b-button>

        <!-- <b-button variant="info" @click="$emit('cons-files', row.item.username)"
          >Mostra File di questo consumer</b-button
        > -->
        <b-button variant="info" @click="$emit('cons-files', row.item.username)"
          >Mostra File</b-button
        >

        <!-- <span style="display:inline-block; width: 10px;"></span> -->

        <b-button class="del" @click="$emit('del-cons', row.item.username)"
          >Elimina consumer</b-button
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

    <p v-if="consumers.length === 0">Non ha caricato file ad alcun consumer</p>
  </div>
  <!-- <div>
    <div v-for="cons in consumers" v-bind:key="cons.username">
      <ConsumerItem
        :cons="cons"
        @cons-files="$emit('cons-files', cons.username)"
        @del-cons="$emit('del-cons', cons.username)"
      />
    </div>
  </div> -->
</template>

<script>
// import ConsumerItem from "./ConsumerItem";

export default {
  name: "Consumers",
  components: {
    // ConsumerItem,
  },
  props: ["consumers"],
  data() {
    return {
      fields: ["username", "actions"],
    };
  },
};
</script>

<style scoped></style>
