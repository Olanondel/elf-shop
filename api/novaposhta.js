export default ({ $axios, $config }) => ({

  async findCity(city) {
    const res = await $axios.post('https://api.novaposhta.ua/v2.0/json/', {
      'modelName': 'AddressGeneral',
      'calledMethod': 'getSettlements',
      'methodProperties': {
        'FindByString': city
      },
      'apiKey': $config.NOVA_POSHTA_API_KEY
    })

    return res.data.data
  },

  async getDepartments(city) {
    const res = await $axios.post('https://api.novaposhta.ua/v2.0/json/', {
      'modelName': 'AddressGeneral',
      'calledMethod': 'getWarehouses',
      'methodProperties': {
        'Language': 'ru',
        'CityName': city
      },
      'apiKey': $config.NOVA_POSHTA_API_KEY
    })

    return res.data.data
  }

})
