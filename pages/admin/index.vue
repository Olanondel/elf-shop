<template>
  <table>
    <tr>
      <th>title</th>
      <th>description</th>
      <th>image</th>
      <th>price</th>
      <th>edit</th>
    </tr>
    <tr
      v-for='item in goods'
      :key='item.id'
    >
      <td>{{item.title}}</td>
      <td>{{item.description}}</td>
      <td class='image'><img :src='item.image' alt=''> </td>
      <td>{{item.price}}</td>
      <td><router-link append :to="item.id">Подробнее</router-link></td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'index',
  async asyncData({ $api }) {
    return { goods: await $api.fb.read('goods') }
  },
  middleware: 'check-admin.client',
  data() {
    return {
      goods: []
    }
  },
}
</script>

<style scoped>
table {
  font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
  border-collapse: collapse;
  color: #686461;
  width: 100%;
}
caption {
  padding: 10px;
  color: white;
  background: #8FD4C1;
  font-size: 18px;
  text-align: left;
  font-weight: bold;
}
th {
  border-bottom: 3px solid #B9B29F;
  padding: 10px;
  text-align: left;
}
td {
  padding: 10px;
}
tr:nth-child(odd) {
  background: white;
}
tr:nth-child(even) {
  background: #E8E6D1;
}
.image img {
  width: 40px;
  height: 40px;
  object-fit: cover;
}
</style>
