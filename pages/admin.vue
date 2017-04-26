<template>
  <section class="container">
    <h1>Datenkrake Admin</h1>
    <button name="" value="" @click="refresh">Refresh</button>
    <h2>Bestätigte Anmeldungen ({{ users.confirmed.length }})</h2>

    <table>
      <thead>
        <tr>
          <th>Name/@Nick</th>
          <th>Mail</th>
          <th>Projekt</th>
          <th>Angemeldet</th>
          <th>Bestätigt</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users.confirmed">
          <td>{{ user.name }}</td>
          <td>{{ user.mail }}</td>
          <td>{{ user.desc }}</td>
          <td>{{ user.createdAt | moment('DD.MM.YYYY HH:mm') }}</td>
          <td>{{ user.updatedAt | moment('DD.MM.YYYY HH:mm') }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Unbestätigte Anmeldungen ({{ users.unconfirmed.length }})</h2>

    <table>
      <thead>
        <tr>
          <th>Name/@Nick</th>
          <th>Mail</th>
          <th>Projekt</th>
          <th>Angemeldet</th>
          <th>Bestätigt</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users.unconfirmed">
          <td>{{ user.name }}</td>
          <td>{{ user.mail }}</td>
          <td>{{ user.desc }}</td>
          <td>{{ user.createdAt | moment('DD.MM.YYYY HH:mm') }}</td>
          <td>{{ user.updatedAt | moment('DD.MM.YYYY HH:mm') }}</td>
        </tr>
      </tbody>
    </table>

  </section>
</template>

<script>
import axios from '~plugins/axios'

export default {
  data() {
    return {
        users: {
          confirmed: [],
          unconfirmed: []
        }
      }
  },
  mounted() {this.refresh()},
  methods: {
    refresh() {
      axios.get('/api/event/users/confirmed')
      .then(function(res) {
        console.log(res)
        this.users.confirmed = res.data
      }.bind(this))
      axios.get('/api/event/users/unconfirmed')
      .then(function(res) {
        console.log(res)
        this.users.unconfirmed = res.data
      }.bind(this))
    }
  }
}
</script>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

table {
    border-collapse: collapse;
    max-width: 97%;
    margin: 1em;
    background-color: white;
}

th, td {
    text-align: left;
    padding: 8px;
    word-wrap: break-word;
}

th {
  word-wrap: break-word;
}

tr:nth-child(even){background-color: #f2f2f2}

input {
  padding: 0.5em;
  border-radius: 2px;
  border-style: solid;
  border-width: 1px;
  border-color: #bfbfbf;
}

</style>
