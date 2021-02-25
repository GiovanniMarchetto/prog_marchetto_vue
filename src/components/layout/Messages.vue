<template>
  <div>
    <b-alert v-show="msg_error" show variant="danger">{{ msg_error }}</b-alert>
    <b-alert v-show="msg_success" show variant="success">{{
      msg_success
    }}</b-alert>
  </div>
</template>

<script>
export default { name: "Messages", props: ["msg_error", "msg_success"] };
</script>

<style></style>
