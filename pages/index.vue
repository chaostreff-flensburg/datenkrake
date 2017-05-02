<template>
  <section class="container">
    <nuxt-link to="/registration">Anmelden</nuxt-link>
    <article class="content" v-html="article"></article>
  </section>
</template>

<script>
import axios from '~plugins/axios'

export default {
  layout: 'weekendhack',
  asyncData(context) {
    return axios.get('/api/event/content/index')
    .then((res) => {
      return { article: res.data.content }
    })
    .catch((e) => {
      context.error({ statusCode: 404, message: 'Article not found' })
    })
  }
}
</script>

<style scoped>
.content {
  position: absolute;
  top: 90vh;
  /*center content*/
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  /*--*/
  z-index: 30;
}
</style>
