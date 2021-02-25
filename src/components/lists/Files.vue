<template>
  <div>
    <div v-if="files.length == 0"><p>Nessun documento</p></div>
    <!--NON può capitare nel caso del consumer-->

    <!-- SE CELLULARE stacked hover-->
    <b-table
      striped
      :items="files"
      :fields="fieldsU"
      v-else-if="ruolo == 'uploader'"
    >
      <template #cell(actions)="row">
        <b-button @click.native="$emit('del-file', row.item.id)" class="del">
          Elimina
        </b-button>
      </template>
    </b-table>

    <b-table striped :items="files" :fields="fieldsC" :tbody-tr-class="highlightNew" v-else>
      <template #cell(actions)="row">
        <b-button @click.native="$emit('download-file', row.item.id)">
          Download
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
// import FilesUploaderItem from "./FilesUploaderItem";
// import FilesConsumerItem from "./FilesConsumerItem";

export default {
  name: "Files",
  components: {
    // FilesConsumerItem,
    // FilesUploaderItem,
  },
  props: ["files", "ruolo"],
  data() {
    return {
      fieldsU: [
        "id",
        "name",
        {
          key: "dataCaricamento",
          sortable: true,
        },
        {
          key: "dataVisualizzazione",
          sortable: true,
        },
        "indirizzoIP",
        "hashtag",
        "actions",
      ],
      fieldsC: [
        "id",
        {
          key: "name",
          sortable: false,
        },
        {
          key: "dataCaricamento",
          sortable: true,
        },
        {
          key: "dataVisualizzazione",
          sortable: true,
        },
        "hashtag",
        "actions"
      ]
    };
  },
  methods:{
    highlightNew(item, type){
        if (!item || type !== 'row') return
        if (item.dataVisualizzazione === "") return 'table-warning'

    }
  }
};
</script>

<style>
/* td {
  padding: 10px;
  border: 1px solid #333;
} */
.del {
  background: brown;
  color: #fff;
}
</style>
