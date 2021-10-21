<template>
  <div class="login">
    <LoginForm/>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";

export default {
  name: 'Login',
  components: {
      LoginForm
  },

}
</script>

<style lang="scss" scoped>
.login {
    background-image: no-repeat center/80% url("/src/assets/background.png");
    background-size: 100%;
}
</style>