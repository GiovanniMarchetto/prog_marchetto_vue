<template>
  <div>
    <br/>
    <b-alert v-show="msg_error" show variant="danger" class="msg">{{ msg_error }}</b-alert>
    <b-alert v-show="msg_success" show variant="success" class="msg">{{
      msg_success
    }}</b-alert>
  </div>
</template>

<script>
export default { name: "Messages", props: ["msg_error", "msg_success"] };
</script>

<!-- <style scoped>
 .msg{
    padding: 100px; 
 }
 </style>
-->