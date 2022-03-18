<template>
  <div class="kn-user-card">
    <div class="user-avatar">
      <el-avatar :size="55" :src="avatarUrl"></el-avatar>
    </div>
    <div class="user-info">
      <span>用户名: {{userName}}</span>
      <!-- TODO：接入后端 -->
      <!-- <br> -->
      <!-- <span>角色: </span> -->
    </div>
    <div class="user-options">
      <el-button type="text" @click="goToManage" class="el-icon-setting"></el-button>
      <el-button type="text" @click="logout" class="el-icon-switch-button"></el-button>
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
    goToManage() {
      // TODO: 用户运维系统
      const h = this.$createElement;
      this.$notify({
        title: '提醒',
        message: h('i', { style: 'color: #f5995a' }, '开发中...'),
      });
    },
    logout() {
      const name = this.getUserName();
      this.$confirm(`当前用户 ${name} 将离开系统, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        window.localStorage.removeItem('kn-token');
        this.$router.replace('/login');
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出操作',
        });
      });
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
    justify-content: center;
    .el-button {
      font-size: 26px;
    }
  }
}
</style>
