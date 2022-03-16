<template>
  <!-- 登录界面 -->
  <div class="kn-login">
    <div class="login-wrap">
      <div class="login-title">
        <h1>密码登录</h1>
      </div>
      <!-- TODO: 后续接入 -> form表单验证进行登录 -->
      <div class="login-form">
        <div class="user-pwd">
          <el-input
            v-model.trim="loginInfo.userName"
            placeholder="用户名"
            prefix-icon="el-icon-user"
          ></el-input>
          <el-input
            v-model="loginInfo.password"
            placeholder="密码"
            show-password
            prefix-icon="el-icon-key"
          ></el-input>
        </div>
        <div class="login-footer">
          <el-checkbox v-model="loginInfo.remeberUser">记住账号</el-checkbox>
          <!-- TODO: 后端接入 -> 忘记密码 + 修改密码 -->
        </div>
        <div class="login-submit">
          <el-button type="primary" class="login-btn" @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginInfo: {
        userName: '',
        password: '',
        remeberUser: false,
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch('user/validateLogin', this.loginInfo);
      if (this.isValidated) {
        this.$router.replace('/');
      } else {
        this.$message.error('用户名/密码错误！请重试！');
      }
    },
  },
  computed: {
    isValidated() {
      return this.$store.getters['user/isValidated'];
    },
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

.login-wrap {
  height: 27%;
  width: 300px;
  padding: 0 20px;
  display: flex;
  border: 2px solid #ddd;
  border-radius: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-title {
  font-size: 20px;
  font-weight: bold;
  padding: 4px;
}

.login-form div {
  margin: 5px 0;
}

.login-btn {
  margin: 5px auto;
  width: 100%;
}
</style>
