<template>
  <div class='admin'>
    <div class='admin__content'>
      <div class='item'>
        Цена:
        <input v-model.number='price' type='text'>
      </div>

      <div class='item'>
        Название:
        <input v-model='title' type='text'>
      </div>

      <div class='item'>
        Вкус:
        <input v-model='taste' type='text'>
      </div>

      <div class='item'>
        Тип:
        <input v-model='type' type='text'>
      </div>

      <div class='item'>
        Изображение:
        <img :src='preview || image' alt='elf'>
        <input ref='image' type='file' @change='setImage'>
      </div>

      <div class='item'>
        Описание:
        <textarea v-model='description' />
      </div>

      <div class='item'>
        <button v-if='!id' @click='setItem'>Добавить</button>
        <button v-else @click='updateItem'>Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: '_id',
  // middleware: 'check-admin.client',
  async asyncData({ params, $api }) {
    if (params.id !== 'add') {
      return {
        ...await $api.fb.readOne('goods', params.id)
      }
    }
  },
  data() {
    return {
      price: 0,
      title: '',
      taste: '',
      type: '',
      description: '',
      count: 1,
      image: null,
      imageFile: null,
      preview: '',
      id: '',
      imageFileName: '',
    }
  },
  computed: {

  },
  methods: {
    setImage() {
      this.imageFile = this.$refs.image.files[0]

      const reader = new FileReader()

      reader.onload = () => this.preview = reader.result

      reader.readAsDataURL(this.imageFile)
    },
    async setItem() {
      try {
        const id = this.id || await this.$api.fb.getId('goods')

        this.image = await this.$api.fb.uploadImage('goods', id, this.imageFile, this.imageFile.name )

        await this.$api.fb.set('goods', {
          price: this.price,
          title: this.title,
          taste: this.taste,
          type: this.type,
          description: this.description,
          count: 1,
          image: this.image,
          id,
        })

        alert('success')
      } catch (err) {
        alert(err)
      }
    },
    async updateItem() {
      try {
        this.image = await this.$api.fb.uploadImage('goods', this.id, this.imageFile, this.imageFile.name )

        await this.$api.fb.update('goods', {
          price: this.price,
          title: this.title,
          taste: this.taste,
          type: this.type,
          description: this.description,
          count: 1,
          image: this.image,
          id: this.id,
          imageFileName: this.imageFile.name
        })

        alert('success')
      } catch (err) {
        alert(err)
      }
    }
  }
}
</script>

<style lang='scss' scoped>

.admin {


  &__content {
    min-height: 100vh;
    max-width: 960px;
    margin: 0 auto;
    padding: 0 15px;
    background: #c9c9c9;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .item {
    padding: 15px;
    display: flex;
    flex-direction: column;
    max-width: 600px;
    width: 100%;

    img {
      max-width: 200px;
      height: auto;
    }

    button {
      margin-bottom: 20px;
    }
  }
}

</style>
