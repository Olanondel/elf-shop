<template>
  <table>
    <tr>
      <th>Клиент</th>
      <th>Номер телефона</th>
      <th>Коментарий к заказу</th>
      <th>Итоговая стоимость.</th>
      <th>Доставка</th>
      <th>Товары</th>
    </tr>
    <tr>
      <td>{{fullName}}</td>
      <td>{{tel}}</td>
      <td>{{comment}}</td>
      <td>{{fullPrice}}</td>
      <td>{{city}}: {{department}}</td>
      <td>
        <div
          v-for='item in cart'
          :key='item.id'
        >
          {{ item.count }}: {{ item.title }}: {{ item.price }} грн
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: '_id',
  // middleware: 'check-admin.client',
  async asyncData({ $api, params }) {
    return { ...await $api.fb.readOne('orders', params.id) }
  },
  data() {
    return {
      fullName: '',
      tel: '',
      comment: '',
      fullPrice: 0,
      cart: [],
      city: '',
      department: '',
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
