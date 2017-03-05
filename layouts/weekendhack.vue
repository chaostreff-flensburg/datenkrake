<template>
  <div class="main">
    <img src="../assets/img/hackend-logo.svg" alt="" class="logo">
    <nuxt/>
    <img src="../assets/img/funkturm.svg" alt="" class="funkturm">
    <img src="../assets/img/overlay.svg" alt="" class="overlay">
  </div>
</template>

<script>

export default {}
</script>

<style>
html, body {
  background-color: #282c37;
  background-image: url("../assets/img/wellen.svg");
  background-position: center;
  background-size: 120%;
  background-repeat: no-repeat;
}
@media (max-width: 800px) {
  html, body {
    background-size: 180%;
  }
}
@media (max-width: 500px) {
  html, body {
    background-size: 200%;
  }
}

p, div, span {
  color: #d9e1e8;
  text-shadow: 0px 0px 50px rgba(0, 0, 0, 0.5);
}

a, em, b {
  color: #cd334d;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
}

.logo {
  max-width: 520px;
  height: auto;
  margin-top: 4em;
  z-index: 0;
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1em;
  margin-right: 1em;
}
.overlay {
  position: fixed;
  top: 90vh;
  width: 110vw;
  z-index: 20;
}
.funkturm {
  position: fixed;
  max-height: 85vh;
  width: auto;
  bottom: 0;
  z-index: 5;
}

.container
{
  margin: 0;
  width: 100%;
  padding: 100px 0;
  text-align: center;
  margin-top: -2em;
  z-index: 15;
}

.button, .button:visited
{
  display: inline-block;
  color: black;
  letter-spacing: 1px;
  background-color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover, .button:focus
{
  color: #fff;
}

.title
{
  color: #000;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}
</style>
