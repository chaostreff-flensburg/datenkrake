<template>
  <section class="container">
    <h2>Eventname</h2>
    <p>Event Description</p>
    <form class="registration" action="/api/event/signup" method="post">
      <input type="text" name="name" placeholder="Name / @Nickname">
      <input type="mail" name="email" value="" placeholder="mail@example.com">
      <textarea name="description" rows="8" cols="80" placeholder="Description"></textarea>
      <button type="submit" name="submit">Submit</button>
    </form>
  </section>
</template>

<script>

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
