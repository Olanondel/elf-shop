<template>
  <div class='modal' :class="{ 'modal_active': isOpen }">
    <div class='modal__content'>
      Ваш заказ принят, ожидайте сообщение с реквизитами
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    isOpen: { type: Boolean, default: false }
  }
}
</script>

<style lang='scss' scoped>
.modal {
  display: none;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);

  &_active {
    display: flex;
  }

  &__content {
    margin: 0 35px 0 20px;
    max-width: 600px;
    width: 100%;
    height: 200px;
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    animation-name: animatetop;
    animation-duration: 0.4s
  }
}

@keyframes animatetop {
  from {top: -300px; opacity: 0}
  to {top: 0; opacity: 1}
}
</style>
