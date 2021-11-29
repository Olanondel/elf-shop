<template>
  <div class='home'>
    <!-- Hero -->
    <Hero has-button />

    <div class='cart__button' @click='toggleCart'></div>

    <!-- Movies -->
    <div class='container movies'>

      <!-- Now Streaming  -->
      <div id='movie-grid' class='movies-grid'>
        <div
          v-for='item in goods'
          :key='item.id'
          class='movie'
        >
          <div class='movie-img'>
            <img
              :src='item.image || defaultImage'
              alt='elf bar'
            />
            <p class='review'>{{ item.price }} грн</p>
            <p class='overview'>{{ item.description }}</p>
          </div>
          <div class='info'>
            <p class='title'>
              {{ item.title }}
            </p>

            <div class='button button-light' @click='addToCart(item)'>В корзину</div>
          </div>
        </div>
      </div>
    </div>

    <Cart
      :items='cart'
      :open='isCartOpen'
      @toggleCart='toggleCart'
      @removeItem='removeItem'
      @minusCount='minusCount'
      @plusCount='plusCount'
      class='cart'
      ref='cart'
    />
  </div>
</template>

<script>
export default {
  name: 'home',
  head() {
    return {
      title: 'Elf Bar Shop',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Get all the latest streaming movies in theaters & online'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'movies, stream, stremaing'
        }
      ]
    }
  },
  async asyncData({ $api }) {
    return {
      goods: await $api.fb.read('goods')
    }
  },
  data() {
    return {
      isCartOpen: false,
      cart: [],
      goods: []
    }
  },
  methods: {
    watchClickToCloseCart(e) {
      const target = e.target
      const cart = document.querySelector('.cart')
      const button = document.querySelector('.cart__button')

      const is__button = target === button
      const is__cart = e.srcElement?.offsetParent?.classList?.contains('cart') || e.target?.classList?.contains('cart__remove-button')

      if (is__button || is__cart) {
        return
      }

      this.toggleCart()
    },
    toggleCart() {
      if (this.isCartOpen) {
        document.body.style.overflow = 'visible'
        this.isCartOpen = false
        document.removeEventListener('click', this.watchClickToCloseCart)
      } else {
        document.body.style.overflow = 'hidden'
        document.addEventListener('click', this.watchClickToCloseCart)
        this.isCartOpen = true
      }

    },

    addToCart(item) {
      const index = this.cart.findIndex(el => el.id === item.id)

      if (index !== -1) {
        this.cart[index].count++
        return
      }

      this.cart.push(item)

      this.addToLocalStorage(this.cart)
    },
    removeItem(id) {
      this.cart = this.cart.filter(el => el.id !== id)

      this.addToLocalStorage(this.cart)
    },
    addToLocalStorage(item) {
      const parsed = JSON.stringify(item)
      localStorage.setItem('cart', parsed)
    },
    minusCount(id) {
      const index = this.cart.findIndex(el => el.id === id)

      this.cart[index].count = --this.cart[index].count

      this.addToLocalStorage(this.cart)
    },
    plusCount(id) {
      const index = this.cart.findIndex(el => el.id === id)

      this.cart[index].count = ++this.cart[index].count

      this.addToLocalStorage(this.cart)
    }
  },
  computed: {
    defaultImage() {
      return require('~/assets/imgs/elf-bar-default.png')
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
  beforeDestroy() {
  }
}
</script>

<style lang='scss'>
.cart__button {
  width: 64px;
  height: 64px;
  background: transparent url("~assets/imgs/carts.png") no-repeat center;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 999;
  cursor: pointer;
}

.home {
  .loading {
    padding-top: 120px;
    align-items: flex-start;
  }

  .search {
    display: flex;
    padding: 32px 16px;

    input {
      max-width: 350px;
      width: 100%;
      padding: 12px 6px;
      font-size: 14px;
      border: none;

      &:focus {
        outline: none;
      }
    }

    .button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .movies {
    padding: 32px 16px;

    .movies-grid {
      display: grid;
      column-gap: 32px;
      row-gap: 64px;
      grid-template-columns: 1fr;
      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 750px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
      }

      .movie {
        position: relative;
        display: flex;
        flex-direction: column;
        background: rgba(0, 0, 0, .4);

        .movie-img {
          position: relative;
          overflow: hidden;

          &:hover {
            .overview {
              transform: translateY(0);
            }
          }

          img {
            display: block;
            width: 100%;
            height: 100%;
          }

          .review {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 94px;
            height: 40px;
            background-color: #c92502;
            color: #fff;
            border-radius: 0 0 16px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }

          .overview {
            line-height: 1.5;
            position: absolute;
            bottom: 0;
            background-color: rgba(201, 38, 2, 0.9);
            padding: 12px;
            color: #fff;
            transform: translateY(100%);
            transition: 0.3s ease-in-out all;
            width: 100%;
          }
        }

        .info {
          padding: 10px 20px;

          margin-top: auto;

          .title {
            margin-top: 8px;
            color: #fff;
            font-size: 20px;
          }

          .release {
            margin-top: 8px;
            color: #c9c9c9;
          }

          .button {
            margin-top: 8px;
          }

          .elf-buttons {
            display: flex;
            justify-content: space-between;
            gap: 10px;

            .button {
              flex: 1 1 auto;
            }
          }
        }
      }
    }
  }
}
</style>
