<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export default {
  name: "App",
  data() {
    return {
      msg: "",
    };
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

h1{
  color: aliceblue;
  background: #2c3e50;
}

form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}/*
input {
  border: 1px solid green;
  padding: 10px;
  margin-bottom: 20px;
}
input[type="submit"] {
  background-color: green;
  color: white;
  padding: 10px;
}
input[type="submit"]:hover {
  background-color: rgb(28, 28, 59);
}
 .alert {
  height: 2em;
  width: 100%;
  background-color: brown;
  border-radius: 20px;
  color: aliceblue;
} */
/*
.nav2{
   background-color: rgb(154, 212, 214);
}  */
.nav2 *{
  color: #2c3e50;
   background-color:  aliceblue;
  /* border: 1px solid #333; */
 }
/*
.nav2 button {
  height: 5em;
  width: 10em;
  background-color: coral;
}*/
.nav2 :hover {
  background-color: aquamarine;
}





/* @media screen and (max-width: 400px) {
  .table-stacked {
     use:true;
  }
} */
</style>
