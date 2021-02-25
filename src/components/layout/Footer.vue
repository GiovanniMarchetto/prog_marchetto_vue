<template>
  <footer>
    <p>
      Per maggiori informazioni vai pure al mio
      <a
        href="https://giovanikettiani.altervista.org/"
        target="_blank"
        rel="noopener"
        >Sito personale</a
      >.
    </p>
    <div id="snackbar" @change="toastFunction">{{msg}}</div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: ["msg"],
methods:{
  toastFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
},}
};
</script>

<style>
footer {
  margin-top: 20px;
  padding: 10px;
  color: aliceblue;
  background: #2c3e50;
}

a {
  color: aquamarine;
}

/* #snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
} 

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
*/
</style>
