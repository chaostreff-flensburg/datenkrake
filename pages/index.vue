<template>
  <section class="container">
    <form action="/api/event/signup" method="post" class="registration">
      <h3>Name / Nickname:</h3>
      <input type="text" name="name" required="true" v-model="user.name" placeholder="Name / @Nickname">
      <h3>Mailadresse:</h3>
      <input type="email" name="email" required="true" v-model="user.mail" placeholder="mail@example.com">
      <h3>Dein Projekt:</h3>
      <textarea name="description" rows="3" cols="80" v-model="user.desc" placeholder="Hast Du bereits ein Projekt, an dem Du arbeiten, oder eine Session, die Du veranstalten möchtest? Beschreibe es! (optionale Angabe)"></textarea>
      <div class="submit">
        <button type="submit">Anmelden</button>
      </div>
    </form>
  </section>
</template>

<script>
import axios from '~plugins/axios'

export default {
  layout: 'weekendhack',
  data: function() {
    return {
      user: {
        name:'',
        mail:'',
        desc:''
      }
    }
  }
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
