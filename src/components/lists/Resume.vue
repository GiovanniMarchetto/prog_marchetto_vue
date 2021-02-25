<template>
  <div>
    

    <table>
      <thead>
        <th>Username</th>
        <th># Documenti Caricati</th>
        <th># Consumer Diversi</th>
        <th></th>
      </thead>
      <tbody v-for="el in resume" :key="el.uploader">
        <tr>
          <td>{{ el.uploader }}</td>
          <td>{{ el.numDocCaricati }}</td>
           <td>{{ el.numConsDiversi }}</td>
          <!--<td>
            <button class="del" @click="$emit('del-upl', el.uploader)">
              Elimina Uploader
            </button>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: "Resume",
  props: ["resume"]
};
</script>

<style></style>
