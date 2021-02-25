<template>
<!-- <table v-else>
      <thead>
        <th></th>
        <th>Nome</th>
        <th>Caricamento</th>
        <th>Visualizzazione</th>
        <th>Hashtag</th>
        <th></th>
      </thead>
      <tbody v-for="file in files" v-bind:key="file.id">
        
        <FilesConsumerItem
          :file="file"
          @download-file="$emit(, file.id)"
        />
      </tbody>
    </table> -->
<!-- .filter((file) => file.dataVisualizzazione === '')" -->

  <tr>
    <td><div class="new" v-if="file.dataVisualizzazione === ''">new</div></td>
    <td>{{ file.name }}</td>
    <td>{{ file.dataCaricamento }}</td>
    <td>{{ file.dataVisualizzazione }}</td>
    <td>{{ file.hashtag }}</td>
    <td>
      <button class="download" @click="$emit('download-file', file.id)">
        Download
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "FilesConsumerItem",
  props: ["file"],
};
</script>

<style scoped>
.new {
  background-color: lightpink;
  color: #fff;
  border: none;
  padding: 5px 9px;
  border-radius: 50%;
  float: left;
}

.download {
  background: lightseagreen;
  color: #fff;
  border: none;
  padding: 5px 9px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
