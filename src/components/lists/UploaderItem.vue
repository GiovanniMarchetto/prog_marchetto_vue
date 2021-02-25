<template>
  <div class="upl-item">
    <p>
        <img class="logo" :src="`${upl.logo}`">
      ---{{ upl.name }}---
      <button @click="$emit('upl-files',upl.username)">Mostra File caricati da questo uploader</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "UploaderItem",
  props: ["upl"]
};
</script>

<style>
.logo{
  float: left;
  height: 2em;
  width: 2em;
}
.upl-item {
  text-align: center;
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}
</style>
