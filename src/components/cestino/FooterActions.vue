<template>
  <div>
    <div class="nav2">
      <button  @click="showSezione('registration')">
        Crea Attore
      </button>
      <button  @click="showSezione('modInfo')">
        Modifica Attore
      </button>
      <button v-if="ruolo==='uploader'" @click="showSezione('upload')">
        Carica nuovo file
      </button>
      <button  @click="showSezione('')">Nascondi opzioni</button>
    </div>

    
    <div v-if="mostraSezione == 'registration'">
      <Registration :potere="ruolo" @reg-evento="$emit('reg-evento', newUtente)" />
    </div>
    <div v-else-if="mostraSezione == 'modInfo'">
      <ModInfo :potere="ruolo" @modInfo-evento="$emit('mod-evento', fakeActor)" />
    </div>
    <div v-else-if="mostraSezione == 'upload' && ruolo == 'uploader'">
      <Upload @upload-evento="$emit('upload-evento', newFile)" />
    </div>
  </div>
</template>

<script>
import Upload from "../functions/Upload";
import Registration from "../functions/Registration";
import ModInfo from "../functions/ModInfo";
export default {
  components: {
    Upload,
    Registration,
    ModInfo
  },
  data() {
    return {
      mostraSezione: null,
    };
  },
  props: ["ruolo"],
  methods: {
    showSezione(sezione) {
      this.mostraSezione = sezione;
    },
  },
};
</script>

<style scoped>
.nav2 {
  background-color: cadetblue;
}
.nav2 button{
  height: 5em;
  width: 10em;
  background-color: coral;
}
.nav2 :hover{
  background-color: aquamarine;
}
</style>