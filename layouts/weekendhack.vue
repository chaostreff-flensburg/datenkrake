<template>
  <div class="main">
    <img src="../assets/img/hackend-logo.svg" alt="weekendHACK Logo" class="logo">
    <div class="description">
      <p>Ein Wochende hacken, prototypen und experimentieren im Technologiezentrum Flensburg. Am 31.03. & 01.04.</p>
    </div>
    <nuxt/>
    <h2 class="infotitle">Weitere Infos</h2>
    <div class="description more">
      <p>
        <strong>Das Event:</strong><br> <br>
        Der Chaostreff Flensburg lädt ein zum weekend<strong>HACK</strong> im Technologiezentrum! Also packt Laptop, Bastelkram und DIY-Projekte jedweder Art ein, um mit anderen Hackern und Häcksen einen Tag (und Nacht) lang im Mate-Rausch den Lötkolben zu schwingen, die Tastatur zum Klappern und die Synapsen zum Feuern zu bringen! <br> <br>
        <strong>Die Location:</strong><br>
        <iframe width="620" height="320" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=9.440989494323732%2C54.761048546252%2C9.453756809234621%2C54.76582106825622&amp;layer=mapnik&amp;marker=54.76343178258027%2C9.447373151779175" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/?mlat=54.76343&amp;mlon=9.44737#map=17/54.76343/9.44737">Größere Karte anzeigen</a></small><br>
        <br>
        <strong>Eure Projekte & Sessionideen:</strong>
        <iframe name="embed_readwrite" src="https://pad.ctfl.space/p/weekendhack0-sessions?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false" width=600 height=400></iframe><br><br>
        Ein Event des <a href="http://chaostreff-flensburg.de">Chaostreff Flensburg</a> und der <a href="http://codingworld.io">Coding World UG (haftungsbeschränkt)</a>.
        <br>
        <a href="http://chaostreff-flensburg.de/impressum/">Impressum</a>
      </p>
    </div>
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
  color: #d9e1e8;
  text-shadow: 0px 0px 50px rgba(0, 0, 0, 0.5);
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

.description p {
  background-image: url("../assets/img/overlay.svg");
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 4em;
  padding: 0.75em;
  padding-top: 1.5em;
  padding-bottom: 1em;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  font-size: 0.875em;
  text-align: center;
}
.more p {
  padding: 2.25em;
  padding-top: 3em;
  padding-bottom: 5em;
  margin-top: 0;
  margin-bottom: 0;
  max-width: 780px;
}
.description {
  z-index: 25;
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
</style>
