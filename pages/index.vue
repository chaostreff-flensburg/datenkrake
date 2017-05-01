<template>
  <section class="container">
    <nuxt-link to="/registration">Anmelden</nuxt-link>
  </section>
</template>

<script>
import axios from '~plugins/axios'

export default {
  layout: 'weekendhack'
}
</script>

<style scoped>
.registration {
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

input {
  padding: 0.75em;
  border-radius: 2px;
}
textarea {
  resize: vertical;
}
.submit {
  text-align: right;
}
button {
  padding: 0.75em;
  margin-top: 0.5em;
}
</style>
