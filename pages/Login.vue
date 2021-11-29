<template>
  <div class='login'>
    <div class='login__content'>
      <div class='login__title'>Login</div>
      <input v-model='email' type='email'>
      <input v-model='password' type='password'>
      <button class='login__button' @click='login'>Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (store.state.isAdmin) {
      return redirect('/')
    }
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      try {
        await this.$api.fb.login(this.email, this.password)

        await this.$router.push('/admin')
      } catch (err) {
        alert(err)
      }
    }
  }
}
</script>

<style lang='scss' scoped>

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  flex-direction: column;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__button {
    cursor: pointer;
  }
}

</style>
