<template>
  <div class='ordering'>
    <Hero />

    <nuxt-link to='/' class='ordering__to-home'>Go Home</nuxt-link>

    <div class='ordering-container'>
      <div class='ordering__title'>Оформление заказа</div>

      <div class='ordering__content'>
        <div class='ordering__form'>

          <div class='ordering__item'>
            <div class='ordering__item-title'>Покупатель</div>

            <div class='ordering__item-content'>
              <div
                class='ordering__form-item ordering__form-item_fullName'
                :class="{ 'ordering__error': invalid }"
              >
                <label>
                  ФИО
                  <input
                    v-model='fullName'
                    type='text'
                    placeholder='Ваше ФИО'
                    :disabled='isLoading'
                  >
                </label>
              </div>

              <div
                class='ordering__form-item ordering__form-item_email'
              >
                <label>
                  Email
                  <input
                    v-model='email'
                    type='email'
                    placeholder='Ваш Email'
                    :disabled='isLoading'
                  >
                </label>
              </div>

              <div
                class='ordering__form-item ordering__form-item_tel'
                :class="{ 'ordering__error': invalid }"
              >
                <label>
                  Телефон
                  <input
                    v-model='tel'
                    type='tel'
                    placeholder='Ваш телефон'
                    :disabled='isLoading'
                  >
                </label>
              </div>
            </div>
          </div>

          <div class='ordering__item'>
            <div class='ordering__item-title'>Доставка в отделение Новой Почты</div>

            <div class='ordering__item-content ordering__item-content_novaposhta'>
              <div
                class='ordering__item-content-city'
                :class="{ 'ordering__error': invalid }"
              >
                <label>
                  *Город
                  <input
                    v-model='citySearch'
                    placeholder='Ваш город'
                    type='text'
                    class='ordering__search'
                    :disabled='isLoading'
                    @focus='isCitySearchOpen = true'
                    @input='getCities'
                  >
                </label>
                <div v-show='isCitySearchOpen && cities.length' class='ordering__select'>
                  <div
                    v-for='(item, index) in cities'
                    :key='item.Ref'
                    class='ordering__select-item'
                    @click='setCity(item.DescriptionRu, item.AreaDescriptionRu)'
                  >
                    {{ item.DescriptionRu }} ({{ item.AreaDescriptionRu }})
                  </div>
                </div>
              </div>

              <div
                class='ordering__item-content-department'
                :class="{ 'ordering__error': invalid }"
              >
                <label>
                  *Отделение
                  <input v-model='departmentSearch'
                         placeholder='Выберите из списка'
                         type='text'
                         class='ordering__search'
                         :disabled='isLoading'
                         @focus='isDepartmentSearchOpen = true'>
                </label>
                <div v-show='isDepartmentSearchOpen && departments.length' class='ordering__select'>
                  <div
                    v-for='(item, index) in departments'
                    :key='item.DescriptionRu'
                    class='ordering__select-item'
                    @click='setDepartment(item.DescriptionRu)'
                  >
                    {{ item.DescriptionRu }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class='ordering__item'>
            <div class='ordering__item-title'>Внимание!</div>

            <div class='ordering__item-content ordering__item-content_important'>
              <div class='ordering__important-item'>- Одноразовые сигареты не подлежат обмену и возврату! Гарантия на
                них не распространяется от производителя!
              </div>
              <div class='ordering__important-item'>- После заказа вам прийдет сообщение с реквизитами для оплаты, не забудьте указать имя и фамилию.
              </div>
            </div>
          </div>

          <textarea
            v-model='comment'
            placeholder='Комментарий к заказу или пожелание'
            class='ordering__comment'
            :disabled='isLoading'
          ></textarea>
        </div>

        <div class='ordering__cart'>
          <div class='ordering__item-title'>Корзина</div>

          <div
            v-for='item in cart'
            :key='item.id'
            class='ordering__cart-item'
          >
            <img :src='defaultImage' alt='elf' class='ordering__cart-image'>

            <div class='ordering__cart-titles'>
              <nuxt-link to='' class='ordering__cart-link'>{{ item.title }}</nuxt-link>
              <div>{{ item.count }} Вкус {{ item.type }} {{ item.taste }}</div>
            </div>

            <div class='ordering__cart-price'>{{ item.price * item.count }} грн</div>
          </div>

          <div class='ordering__cart-item ordering__cart-item_basket'>
            Всего: <span>{{ fullPrice }} грн</span>
          </div>
        </div>
      </div>
      <button
        :disabled='isLoading'
        class='ordering__button'
        @click='toOrder'
        >Оформить заказ</button>
    </div>

    <Modal :is-open='isModalOpen' />
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Hero from '~/components/Hero'
import Modal from '~/components/Modal'

export default {
  components: { Modal, Hero },
  data() {
    return {
      cart: [],
      fullName: '',
      email: '',
      tel: '',
      comment: '',
      city: '',
      region: '',
      citySearch: '',
      isCitySearchOpen: false,
      department: '',
      departmentSearch: '',
      isDepartmentSearchOpen: false,
      id: '',
      isLoading: false,
      isModalOpen: false,

      cities: [],
      departments: []
    }
  },

  validations: {
    fullName: {
      required
    },
    tel: {
      required
    },
    city: {
      required
    },
    department: {
      required
    },
  },

  mounted() {
    if (localStorage.getItem('cart')) {
      try {
        this.cart = JSON.parse(localStorage.getItem('cart')) || []
      } catch (e) {
        localStorage.removeItem('cart')
      }
    }
  },
  computed: {
    defaultImage() {
      return require('~/assets/imgs/elf-bar-default.png')
    },
    fullPrice() {
      let sum = 0

      if (this.cart?.length) {
        this.cart.forEach(el => {
          sum = el.price * el.count
        })
      }

      return sum
    },
    invalid() {
      return (this.$v.$dirty && this.$v.$invalid)
    }
  },
  watch: {
    isCitySearchOpen() {
      if (this.isCitySearchOpen) {
        document.addEventListener('click', this.watchClickToCloseSelect)
      } else {
        document.removeEventListener('click', this.watchClickToCloseSelect)
      }
    },
    isDepartmentSearchOpen() {
      if (this.isDepartmentSearchOpen) {
        document.addEventListener('click', this.watchClickToCloseSelect)
      } else {
        document.removeEventListener('click', this.watchClickToCloseSelect)
      }
    }
  },
  methods: {
    async toOrder() {
      await this.$v.$touch()

      if (this.$v.$invalid) {
        const el = document.querySelector(".ordering__error")
        el.scrollIntoView()
        return
      }

      try {
        this.isLoading = true

        await this.$api.fb.set('orders', {
          cart: this.cart,
          fullName: this.fullName,
          email: this.email,
          tel: this.tel,
          comment: this.comment,
          city: this.city,
          region: this.region,
          department: this.department,
        })

        localStorage.removeItem('cart')

        this.isLoading = false

        this.isModalOpen = true

        setTimeout(() => { this.isModalOpen = false }, 1300)
        await this.$router.push('/')
      } catch (err) {
        this.isLoading = false
        await this.$router.push('/error')
      }
    },
    async getCities() {
      this.cities = await this.$api.novaposhta.findCity(this.citySearch)

      this.isCitySearchOpen = true
    },
    async getDepartments() {
      this.departments = await this.$api.novaposhta.getDepartments(this.city)
    },
    setCity(city, region) {
      this.city = city
      this.region = region
      this.citySearch = `${city} (${region})`
      this.isCitySearchOpen = false

      this.getDepartments()
    },
    setDepartment(department) {
      this.department = this.departmentSearch = department

      this.isDepartmentSearchOpen = false
    },
    watchClickToCloseSelect(e) {
      if (!(e.target.classList.contains('ordering__select') || e.target.classList.contains('ordering__search'))) {
        this.isCitySearchOpen = false
        this.isDepartmentSearchOpen = false
      }
    }
  }
}
</script>

<style scoped lang='scss'>

.ordering-container {
  background: #fff;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 15px;
}

.ordering {
  background: #fff;

  &__error {

    label {
      color: red;
    }

    input {
      border: 1px solid red !important;
    }
  }

  &__to-home {
    font-size: 36px;
    color: #fff;
    position: absolute;
    top: 20px;
    left: 25px;
    cursor: pointer;
    z-index: 99;
    text-decoration: none;
  }

  &__content {
    display: flex;
    gap: 0 30px;

    @media all and (max-width: 960px) {
      flex-wrap: wrap;
    }
  }

  &__form {
    flex: 1 1 auto;

    @media all and (max-width: 960px) {
      margin-bottom: 20px;
    }
  }

  &__title {
    font-weight: 700;
    color: #000000;
    font-size: 36px;
    margin: 30px 0;
  }

  &__item {
    border: 1px solid #e8e8e8;
    margin-bottom: 25px;
  }

  &__item-title {
    color: #000;
    padding: 20px;
    font-weight: 500;
    font-size: 26px;
    border-bottom: 1px solid #e8e8e8;
  }

  &__item-content {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    gap: 15px;

    @media all and (max-width: 680px) {
      flex-wrap: wrap;
    }

    &_important {
      justify-content: flex-start;
      flex-direction: column;
    }

    &_novaposhta {
      position: relative;
      justify-content: flex-start;
      gap: 0 40px;

      label {
        display: flex;
        flex-direction: column;

        input {
          padding: 10px 18px;
          outline: none;
          border-radius: 4px;
          border: 1px solid #f2f2f2;
          margin-top: 5px;
        }
      }
    }

    &-city {

      @media all and (max-width: 680px) {
        margin-bottom: 15px;
      }
    }

    &-city, &-department {
      position: relative;
      flex: 0 0 46%;
    }
  }

  &__select {
    box-shadow: 0 0 10px #000;
    width: 100%;
    position: absolute;
    max-height: 240px;
    overflow: auto;
    z-index: 99;
    background: #fff;
    top: 104%;

    &-item {
      padding: 4px 6px;
      cursor: pointer;

      &:hover {
        background: yellow;
      }
    }
  }

  &__form-item {
    flex: 1 1 auto;

    @media all and (max-width: 680px) {
      flex: 0 0 100%;
    }

    & > label {
      display: flex;
      flex-direction: column;

      > input {
        padding: 10px 18px;
        outline: none;
        border-radius: 4px;
        border: 1px solid #f2f2f2;
        margin-top: 5px;
      }
    }

    &_fullName {
      flex: 1 1 40%;
    }
  }

  &__comment {
    display: block;
    width: 100%;
    min-height: 100px;
    resize: vertical;
    padding: 6px 8px;
    margin-bottom: 20px;
    outline: none;
  }

  &__button {
    background: #ffe300;
    color: #333;
    border: none;
    padding: 10px 20px;
    font-weight: 700;
    text-transform: uppercase;
    border-radius: 16px;
    color: #000;
    cursor: pointer;
    margin-left: 20px;
    margin-bottom: 60px;

    &:hover {
      background: orange;
    }

    &:disabled {
      background: gray;
      cursor: not-allowed;
    }
  }

  &__cart {
    flex: 1 1 30%;
    border: 1px solid #e8e8e8;
    max-height: 700px;
    overflow: auto;

    @media all and (max-width: 960px) {
      margin-bottom: 20px;
    }

    &-item {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      padding: 20px;
      gap: 10px;

      &_basket {
        line-height: 38px;

        > span {
          font-size: 30px;
          line-height: 30px;
          font-weight: 500;
        }
      }
    }

    &-image {
      width: 60px;
      height: 60px;
      object-fit: contain;
      border: 1px solid #f6f6f6;
      padding: 6px;
    }

    &-titles {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-weight: 500;
      font-size: 14px;
    }

    &-link {
      color: #3660bc;
      text-decoration: none;
    }


  }
}

</style>
