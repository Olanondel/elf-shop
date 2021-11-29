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
              <div class='ordering__form-item ordering__form-item_fullName'>
                <label>
                  ФИО
                  <input v-model='fullName' type='text' placeholder='Ваше ФИО'>
                </label>
              </div>

              <div class='ordering__form-item ordering__form-item_email'>
                <label>
                  Email
                  <input v-model='email' type='email' placeholder='Ваш Email'>
                </label>
              </div>

              <div class='ordering__form-item ordering__form-item_tel'>
                <label>
                  Телефон
                  <input v-model='tel' type='tel' placeholder='Ваш телефон'>
                </label>
              </div>
            </div>
          </div>

          <div class='ordering__item'>
            <div class='ordering__item-title'>Доставка в отделение Новой Почты</div>

            <div class='ordering__item-content ordering__item-content_novaposhta'>
              <div class='ordering__item-content-city'>
                <label>
                  *Город
                  <input v-model='citySearch' placeholder='Ваш город' type='text' class='ordering__search'
                         @focus='isCitySearchOpen = true' @input='getCities'>
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

              <div class='ordering__item-content-department'>
                <label>
                  *Отделение
                  <input v-model='departmentSearch' placeholder='Выберите из списка' type='text'
                         class='ordering__search'
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

            <div class='ordering__item-content'>
              <div class='ordering__important-item'>- Одноразовые сигареты не подлежат обмену и возврату! Гарантия на
                них не распространяется от производителя!
              </div>
            </div>
          </div>

          <textarea v-model='comment' placeholder='Комментарий к заказу или пожелание'
                    class='ordering__comment'></textarea>
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
      <button class='ordering__button'>Оформить заказ</button>
    </div>
  </div>
</template>

<script>
import Hero from '~/components/Hero'

export default {
  components: { Hero },
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

      cities: [],
      departments: []
    }
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
