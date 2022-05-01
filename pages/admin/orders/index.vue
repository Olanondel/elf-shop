<template>
  <table>
    <tr>
      <th>Клиент</th>
      <th>Номер телефона</th>
      <th>Коментарий к заказу</th>
      <th>Итоговая стоимость.</th>
      <th>Подробнее</th>
    </tr>
    <tr
      v-for='item in goods'
      :key='item.id'
    >
      <td>{{item.fullName}}</td>
      <td>{{item.tel}}</td>
      <td>{{item.comment}}</td>
      <td>{{item.fullPrice}}</td>
      <td><router-link append :to="item.id">Подробнее</router-link></td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'index',
  // middleware: 'check-admin.client',
  async asyncData({ $api }) {
    return { goods: await $api.fb.read('orders') }
  },
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
</style>
