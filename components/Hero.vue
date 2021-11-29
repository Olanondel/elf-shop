<template>
  <div class="hero">
    <img src="../assets/imgs/movieHero-1.jpg" alt="" />
    <div class="text-container">
      <div class="text">
        <h1>Дополни <span>свой стиль</span> модным девайсом!</h1>
        <a v-if='hasButton' href="#movie-grid" class="button">Выбрать Elf Bar</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hero',
  props: {
    hasButton: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  height: 400px;
  position: relative;
  @media (min-width: 750px) {
    height: 500px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: -72px;

    @media (min-width: 750px) {
      object-position: 0;
    }
  }

  .text-container {
    z-index: 99;
    position: absolute;
    top: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .text {
      padding: 0 16px;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
    }

    .mini-heading {
      font-weight: 600;
      font-size: 18px;
      text-transform: uppercase;
      color: #c92502;
      margin-bottom: 8px;
      @media (min-width: 750px) {
        font-size: 22px;
      }
    }

    h1 {
      color: #fff;
      text-shadow: 3px 4px 5px #000;
      font-size: 42px;
      font-weight: 200;
      margin-bottom: 8px;

      @media (min-width: 750px) {
        font-size: 84px;
      }

      span {
        font-weight: 500;
      }
    }

    .button {
      font-size: 20px;
      align-self: flex-start;
      background-color: #fbb034;
      background-image: linear-gradient(315deg, #fbb034 0%, #ffdd00 74%);
    }
  }
}
</style>
