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
}

header {
  text-align: center;
  padding: 10px;
  color: #fff;
  background: #343a40;
  /* color: aliceblue;
  background: #2c3e50; */
}
h2 {
  padding: 10px;
  color: #fff;
  background: #e66648;
}
h3 {
  padding: 10px;
}

form {
  padding: 10px;
  border: 1px solid #2c3e50;
  text-align: left;
  background-color: aliceblue;

  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
}

.btn {
  margin: 10px;
}
.btn-inline {
  margin: 0px;
}

/*
input {
  border: 1px solid green;
  
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

/* @media screen and (max-width: 400px) {
  .table-stacked {
     use:true;
  }
} */

/*CONSUMER PAGE*/
/* .nav2 {
  background-color: cadetblue;
}
.buu {
  height: 5em;
  width: 10em;
  background-color: coral;
}
:hover.buu {
  background-color: aquamarine;
} */
/* 
form {
  flex-direction: row;
} */
/* 
#snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: red;
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
} */
</style>
