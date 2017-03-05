<template>
  <section class="container">
    <p>Ein Event des <a href="http://chaostreff-flensburg.de">Chaostreff Flensburg</a>.</p>
    <div class="registration">
      <input type="text" name="name" v-model="user.name" placeholder="Name / @Nickname">
      <input type="mail" name="email" v-model="user.mail" placeholder="mail@example.com">
      <textarea name="description" rows="2" cols="80" v-model="user.desc" placeholder="Description"></textarea>
      <button v-on:click="signup" name="submit">Submit</button>
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

</style>
