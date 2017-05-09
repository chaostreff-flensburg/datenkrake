<template>
  <div class="main">
    <img src="../assets/img/hackend-logo.svg" alt="weekendHACK Logo" class="logo">
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
  font-family: "Arvo", monospace !important;
  text-shadow: none;
  line-height: 1.25;
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
  .overlay {
    display: none;
  }
  iframe {
    max-width: 80vw;
  }
  .funkturm {
    max-width: 80vw;
  }
}

p, div, span {
  color: #282c37;
}

h1, h2, h3, h4, h5, h6 {
  color: #cd334d;
  /*text-shadow: 0px 0px 50px rgba(0, 0, 0, 0.5);*/
  margin-bottom: 0.25em;
  margin-top: 0.5em;
  text-align: left;
  z-index: 15;
}
input, textarea {
  padding: 0.75em;
  border-radius: 2px;
  border-style: none;
}
hr {
  border-style: solid;
  color: rgb(220, 220, 220);
}

article {
  background-image: url("../assets/img/overlay.svg");
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 0.875em;
  padding: 1em;
  margin-left: auto;
  margin-right: auto;
  margin-top: 4em;
  text-align: left;
}
article p {
  margin: 0 0.2em;
  z-index: 25;
}
article {
  padding: 2.25em;
  padding-top: 3em;
  padding-bottom: 5em;
  margin-top: 0;
  margin-bottom: 0;
  max-width: 780px;
}

.infotitle {
  margin-top: 2em;
}

a, em, strong {
  color: #cd334d;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  font-style: normal;
  font-size: 0.9em;
}
iframe {
  margin-top: 1.5em;
}
small {
  font-size: 0.75em;
}

.logo {
  max-width: 480px;
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
  z-index: 10;
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
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  text-align: center !important;
  z-index: 15 !important;
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

.red {
  color: #cd334d;
}
</style>
