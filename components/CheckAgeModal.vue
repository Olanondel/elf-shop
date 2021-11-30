<template>
  <div class='modal'>
    <div class='modal__content'>
      <div class='modal__text'>Вам исполнилось<br> 18 лет?</div>

      <div class='modal__variants'>
        <div class='modal__variants-item modal__variants-item_true' @click='setAge(true)'>Да</div>
        <div class='modal__variants-item' @click='setAge(false)'>Нет</div>
      </div>

      <div
        class='modal__error'
        :class="{ 'modal__error_visible': error }"
      >Контент сайта предназначен для людей старше 18 лет, подтвердите возраст или покиньте сайт!
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckAgeModal',
  data() {
    return {
      error: false
    }
  },
  methods: {
    setAge(bool) {
      if (bool) {
        localStorage.setItem('older18', 'true')
        this.$emit('setAge')
      } else {
        this.error = true
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.modal {
  min-width: 100vw;
  min-height: 100vh;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  &__content {
    max-width: 600px;
    width: 100%;
    height: 400px;
    color: #f5f5f5;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  &__text {
    font-size: 34px;
    margin-bottom: 30px;
  }

  &__variants {
    display: flex;
    gap: 6px;
    margin-bottom: 30px;

    &-item {
      padding: 10px 26px;
      cursor: pointer;
      border-radius: 4px;

      &_true {
        background: #ffa31a;
        color: #000;
      }
    }
  }

  &__error {
    opacity: 0;
  }

  &__error_visible {
    opacity: 1;
  }
}
</style>
