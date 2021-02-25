<template>
  <div class="cons-item">
    <p>
      {{ cons.name }}---
      <b-button @click="$emit('cons-files',cons.username)">Mostra File di questo consumer</b-button>
      <b-button class="del" @click="$emit('del-cons',cons.username)" >Elimina</b-button>
    </p>
  </div>
</template>

<script>
export default {
  name: "ConsumerItem",
  props: ["cons"]
};
</script>

<style>
.cons-item {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}
</style>
