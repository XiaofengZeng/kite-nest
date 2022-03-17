<template>
  <div class="kn-user-card">
    <div class="user-avatar">
      <el-avatar :size="55" :src="avatarUrl"></el-avatar>
    </div>
    <div class="user-info">
      <span>用户名: {{userName}}</span>
      <br>
      <!-- TODO：接入后端 -->
      <!-- <span>角色: </span> -->
    </div>
    <div class="user-options">
      <span class="el-icon-setting"></span>
      <span class="el-icon-switch-button"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  data() {
    return {
      avatarUrl: 'https://avatars.githubusercontent.com/u/49650943?v=4',
    };
  },
  methods: {
    getUserName() {
      return JSON.parse(localStorage.getItem('kn-token')).name;
    },
  },
  computed: {
    userName() {
      return this.getUserName();
    },
  },
};
</script>

<style lang="less" scoped>
.kn-user-card {
  width: inherit;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  background-color: rgba(70, 70, 70, 0.7);
  .user-avatar {
    width: 80px;
    margin: auto;
  }
  .user-info {
    flex: 1;
    text-align: start;
    font-size: 18px;
    font-weight: bold;
  }
  .user-options {
    width: 80px;
    font-size: 28px;
    justify-content: center;
    span {
      margin: 5px;
      color: rgb(255, 255, 255);
      :hover {
        color: #F5995A;
      }
    }
  }
}
</style>
