<template>
  <section class="container">
    <nuxt-link to="/registration">Anmelden</nuxt-link>
    <article v-html="article"></article>
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

</style>
