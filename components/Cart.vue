<template>
  <div ref='cart' class='cart' :class='{ cart_active: open }'>
    <div class='cart__header'>
      <div class='cart__hidden' @click='toggleCart'></div>
      <div class='cart__title'>Корзина</div>
    </div>

    <div class='cart__content'>
      <div
        v-for='item in items'
        :key='item.id'
        class='cart__item'
      >
        <div class='cart__rows'>
          <div class='cart__row'>
            <div class='cart__image'>
              <img :src='item.image || defaultImage' alt='elf bar'>
            </div>

            <div class='cart__info'>
              <nuxt-link to='' class='cart__info-title'>
                {{ item.title }}
              </nuxt-link>
              <div class='cart__info-taste'>
                Вкус {{item.type}} {{item.taste}}
              </div>
            </div>
          </div>
          <div class='cart__row'>
            <div class='cart__item-price'>{{item.price * item.count}} грн</div>

            <div class='cart__item-count-control'>
              <div class='cart__item-count-control-item' @click='minusCount(item.id)'>-</div>
              <div class='cart__item-count-control-item cart__item-count-control-item-count'>{{ item.count }}</div>
              <div class='cart__item-count-control-item' @click='plusCount(item.id)'>+</div>
            </div>
          </div>
        </div>
        <div class='cart__remove'>
          <div class='cart__remove-button' @click='removeItem(item.id)'>
            X
          </div>
        </div>
      </div>
    </div>

    <div class='cart__footer'>
      <div class='cart__price'>
        Всего: {{fullPrice}} грн.
      </div>
      <div class='cart__registration' :class="{ cart__disabled: !items.length }" @click='toOrder'>Оформление заказа</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: {
    open: { type: Boolean, default: false },
    items: { type: Array, default: () => [] }
  },
  data() {
    return {

    }
  },
  computed: {
    defaultImage() {
      return require('~/assets/imgs/elf-bar-default.png')
    },
    fullPrice() {
      let sum = 0

      if (this.items?.length) {
        this.items.forEach(el => {
          sum = el.price * el.count
        })
      }

      return sum
    }
  },
  methods: {
    toOrder() {
      if (this.items.length) {
        this.$router.push('/ordering')
      }
    },
    toggleCart() {
      this.$emit('toggleCart')
    },
    removeItem(id) {
      this.$emit('removeItem', id)
    },
    minusCount(id) {
      this.$emit('minusCount', id)
    },
    plusCount(id) {
      this.$emit('plusCount', id)
    }
  },
}
</script>

<style lang='scss' scoped>
.cart {
  min-height: 100vh;
  max-height: 100vh;
  width: 100%;
  position: fixed;
  right: -100%;
  top: 0;
  z-index: 999;
  background: #fff;
  display: flex;
  flex-direction: column;
  transition: right ease .6s;

  @media all and (min-width: 640px) {
    max-width: 640px;
  }

  &_active {
    right: 0;
  }

  &__header {
    display: flex;
  }

  &__hidden {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 64px;
    flex: 0 0 64px;
    border: 1px solid #e8e8e8;
    background: transparent url("~assets/imgs/next.png") no-repeat center;
  }

  &__title {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-bottom: 1px solid #e8e8e8;
    font-weight: 700;
    color: #343434;
    font-size: 22px;
  }

  &__content {
    padding: 15px;
    flex: 1 1 auto;
    overflow: auto;
  }

  &__item {
    justify-content: space-between;
    display: flex;
    padding: 20px;
    gap: 20px 0;
    border-bottom: 1px solid #e8e8e8;
  }

  &__row {
    display: flex;
    gap: 0 15px;
    align-items: center;
  }

  &__remove {
    display: flex;
    justify-content: center;
    align-items: center;

    &-button {
      cursor: pointer;
    }
  }

  &__item-price {
    width: 60px;
    text-align: center;
    white-space: nowrap;
  }

  &__item-count-control {
    display: flex;
    background: #f3f3f3;
    border-radius: 12px;

    &-item {
      cursor: pointer;
      padding: 4px 6px;

      &-count {
        padding: 4px 26px;
      }
    }
  }

  &__info {
    gap: 6px;
    display: flex;
    flex-direction: column;

    &-item {

    }

    &-title {
      color: #3660bc;
      text-decoration: none;
    }

    &-taste {

    }
  }

  &__image {
    width: 60px;
    height: 60px;
    padding: 10px;
    border: 1px solid #f6f6f6;

    img {
      max-width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__footer {
    flex: 0 0 60px;
    display: flex;
    padding: 15px;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #e8e8e8;

    @media all and (max-width: 480px) {
      margin-bottom: 65px;
    }
  }

  &__registration {
    background: #ffd600;
    color: #000;
    font-weight: 700;
    border-radius: 12px;
    padding: 10px 15px;
    cursor: pointer;
    text-decoration: none;
  }

  &__disabled {
    background: gray;
    cursor: not-allowed;
  }
}
</style>
