<template>
  <section class="container">
    <div class="content">
      <article v-html="article">
      </article>
    </div>
  </section>
</template>

<script>
import axios from '~plugins/axios'

export default {
  layout: 'weekendhack',
  asyncData(context) {
    return axios.get('/api/event/content/' + context.params.slug)
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
#regLink {
  margin-top: 2.7em;
  font-size: 26px;
  font-weight: 600;
}
#regLink span {
  padding: 0.75rem;
  border-style: solid;
  border-radius: 5px;
  border-width: 1.5px;
  border-color: #cd334d;
  text-shadow: 0px 0px 50px rgba(0, 0, 0, 0.5);
}

.content {
  position: absolute;
  top: 40vh;
  /*center content*/
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  /*--*/
  z-index: 30;
}
</style>
