<template>
  <div class="kn-scene-switcher">
    <div class="scene-title">
      <span>场景</span>
    </div>
    <div class="scene-options">
      <ul>
        <li v-for="s in scenes" :key="s.key">
          <!-- TODO: 插图形式切换 -->
          <el-button
            type="primary"
            plain
            :class="isActivated(s.key)"
            @click="changeScene(s.key, s.routePath)"
          >{{ s.title }}</el-button>
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
        { key: 'dashboard', title: '看板', routePath: '/dashboard' },
        { key: 'warehouse', title: '仓库管理', routePath: '/warehouse' },
        { key: 'map', title: '地图展示', routePath: '/map/2d' },
      ],
    };
  },
  methods: {
    isActivated(value) {
      return this.activatedScene === value ? 'active' : null;
    },
    changeScene(value) {
      if (this.activatedScene !== value) {
        this.activatedScene = value;
        this.$router.push(`/${value}`);
      }
    },
  },
  mounted() {
    this.scenes.forEach((s) => {
      if (this.$router.currentRoute.path.indexOf(s.routePath) > -1) {
        this.activatedScene = s.key;
      }
    });
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
    color: #fff;
    background-color: #f48031;
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
      background: #f38031;
      border-color: #f38031;
      color: #fff;
    }
  }
}
</style>
