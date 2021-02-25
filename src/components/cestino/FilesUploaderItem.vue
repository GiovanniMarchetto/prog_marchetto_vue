<template>

    <!-- 
      IN FILES C'ERA QUESTO



      <table v-else-if="ruolo == 'uploader'"><thead><th>Nome</th>
      <th>Visualizzazione</th><th>Indirizzo IP</th><th>Hashtag</th>
      <th></th></thead><tbody v-for="file in files" v-bind:key="file.id">
      <FilesUploaderItem :file="file" @del-file="$emit('del-file', file.id)"/>
      </tbody></table> 
    -->



    <tr>
      <td>{{ file.name }}</td>
      <td>{{file.dataVisualizzazione}}</td>
      <td>{{file.indirizzoIP}}</td>
      <td>{{file.hashtag}}</td>
      <td><button class="del" @click="$emit('del-file', file.id)">x</button></td>
    </tr>
</template>

<script>
export default {
  name: "FilesConsumerItem",
  props: ["file"],
};
</script>

<style scoped>
.del {
  background: #ff0000;
  color: #fff;
  border: none;
  padding: 5px 9px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
}
</style>
