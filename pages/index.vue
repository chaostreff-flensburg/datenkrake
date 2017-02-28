<template>
  <section class="container">
    <h2>Eventname</h2>
    <p>Event Description</p>
    <div class="registration">
      <input type="text" name="name" placeholder="Name / @Nickname">
      <input type="mail" name="email" value="" placeholder="mail@example.com">
      <textarea name="description" rows="8" cols="80" placeholder="Description"></textarea>
      <button v-on:click="signup" name="submit">Submit</button>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    signup: function() {
      alert('Submit')
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
