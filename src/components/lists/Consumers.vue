<template>
  <b-table striped responsive sticky-header="600px" :items="consumers" :fields="fields">
    <template #cell(actions)="row">
      <b-button variant="info" @click="$emit('cons-files', row.item.username)"
        >Mostra File di questo consumer</b-button
      >
      
      <span style="display:inline-block; width: 10px;"></span>

      <b-button class="del" @click="$emit('del-cons', row.item.username)"
        >Elimina consumer</b-button
      >
    </template>
  </b-table>
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
      fields: ["username", "name", "actions"],
    };
  },
};
</script>

<style scoped></style>
