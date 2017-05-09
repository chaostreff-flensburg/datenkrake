<template>
  <section class="container">
    <form action="/api/event/signup" method="post" class="registration">
      <h2 class="red">Anmeldung</h2>
      <h3>Name / Nickname:</h3>
      <input type="text" name="name" placeholder="Name / @Nickname" required>
      <h3>Mailadresse:</h3>
      <input type="email" name="email" placeholder="mail@example.com" required>
      <h3>Dein Projekt:</h3>
      <textarea name="description" rows="3" cols="80" placeholder="Hast Du bereits ein Projekt, an dem Du arbeiten, oder eine Session, die Du veranstalten möchtest? Beschreibe es! (optionale Angabe)"></textarea>
      <h3>Essenspräferenz:</h3>
      <select name="vegi">
        <option value="vegi">Vegetarisch</option>
        <option value="vegan">Vegan</option>
        <option value="meat">Mit Fleisch</option>
      </select>
      <div class="submit">
        <button type="submit">Anmelden</button>
      </div>
    </form>
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
    return axios.get('/api/event/content/registration')
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
h2 {
  margin-top: 1.5em;
}
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
.content {
  margin-top: 1em;
  /*center content*/
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  /*--*/
  z-index: 30;
}
</style>
