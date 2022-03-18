<template>
  <div class="kn-scene-switcher">
    <div class="scene-title">
      <span>场景</span>
    </div>
    <div class="scene-options">
      <ul>
        <!-- <li><el-button type="primary" plain class="acitve">主页</el-button></li>
        <li><el-button type="primary" plain>仓库管理</el-button></li>
        <li><el-button type="primary" plain>地图展示</el-button></li> -->
        <li v-for="s in scenes" :key="s.key">
          <!-- TODO: 插图形式切换 -->
          <el-button
            type="primary"
            plain
            :class="isActivated(s.key)"
            @click="changeScene(s.key, s.routePath)"
          >
            {{s.title}}
          </el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SceneSwitcher',
  data() {
    return {
      activatedScene: 'dashboard',
      scenes: [
        { key: 'dashboard', title: '看板' },
        { key: 'warehouse', title: '仓库管理' },
        { key: 'map', title: '地图展示' },
      ],
    };
  },
  methods: {
    isActivated(value) {
      return this.activatedScene === value ? 'active' : null;
    },
    changeScene(value) {
      this.activatedScene = value;
      this.$router.push(`/${value}`);
    },
  },
};
</script>

<style lang="less" scoped>
.kn-scene-switcher {
  width: inherit;
  height: 100px;
  display: flex;
  flex-direction: row;
  background-color: rgba(115, 119, 124, 0.5);
  .scene-title {
    width: 30px;
    display: flex;
    align-items: center;
    color: #FFF;
    background-color: #f48031
  }
  .scene-options {
    width: 320px;
    display: flex;
    flex: 1;
    ul {
      width: inherit;
      list-style: none;
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        display: inline;
        margin: 5px;
      }
    }
    .active {
      background: #F38031;
      border-color: #F38031;
      color: #FFF;
    }
  }
}
</style>
