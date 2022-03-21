<template>
  <!-- 登录界面 -->
  <div class="kn-login">
    <Login></Login>
  </div>
</template>

<script>
import Login from '../components/Login/index.vue';

export default {
  name: 'LoginView',
  components: {
    Login,
  },
};
</script>

<style lang="less" scoped>
.kn-login {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
