<template>
  <div>
    <div v-for="upl in uploaders" v-bind:key="upl.username">
      <UploaderItem :upl="upl" @upl-files="$emit('upl-files', upl.username)" />
    </div>
  </div>
</template>

<script>
import UploaderItem from "./UploaderItem";

export default {
  name: "Uploaders",
  components: {
    UploaderItem,
  },
  props: ["uploaders"],
};
</script>

<style scoped></style>
