<template>
  <section class="container">
    <div class="registration">
      <h3>Name:</h3>
      <input type="text" name="name" required="true" v-model="user.name" placeholder="Name / @Nickname">
      <h3>Mailadresse:</h3>
      <input type="mail" name="email" required="true" v-model="user.mail" placeholder="mail@example.com">
      <h3>Dein Projekt:</h3>
      <textarea name="description" rows="2" cols="80" required="true" v-model="user.desc" placeholder="Description"></textarea>
      <div class="submit">
        <button v-on:click="signup" name="submit">Anmelden</button>
      </div>
    </div>
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
  },
  methods: {
    signup: function() {
      axios.post('/api/event/signup', {
        name: this.user.name,
        mail: this.user.mail,
        desc: this.user.desc
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
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
  border-style: none;
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
