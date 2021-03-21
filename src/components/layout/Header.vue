<template>
  <header>
    <Logout v-show="!this.$route.path.endsWith('/')" />
    <h1>ProgMarchetto</h1>
  </header>
</template>

<script>
import Logout from "@/components/functions/Logout";

export default {
  name: "Header",
  components: {
    Logout,
  },
};
</script>
