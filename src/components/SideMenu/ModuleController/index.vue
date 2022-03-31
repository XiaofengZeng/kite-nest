<template>
  <div class="kn-module-cotroller">
    <div class="module-title">
      <span>功能模块</span>
    </div>
    <div class="module-directories">
      <template v-for="directory in directorise">
        <div class="directory" :key="directory.key">
          <div class="directory-title">
            {{ directory.title }}
          </div>
          <div class="directory-item">
            <ul>
              <template v-for="item in directory.list">
                <li :key="item.id">
                  <el-button
                    type="primary"
                    plain
                    :class="isActivated(item.enName)"
                    @click="toggleModule(item.invokedFn, item.args)"
                  >
                    {{ item.cnName }}
                  </el-button>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Executor from './mixin/Executor';

export default {
  name: 'ModuleController',
  components: {},
  data() {
    return {
      directorise: [],
    };
  },
  mixins: [Executor],
  methods: {
    getDirectorise() {
      switch (this.currentScene.toLowerCase()) {
        case 'dashboard':
          this.directorise = [];
          break;
        case 'warehouse':
          this.directorise = [];
          break;
        case 'map':
          switch (this.currentMap.toLowerCase()) {
            case 'map2d':
              this.directorise = this.$store.state.map2d.moduleDrectories;
              break;
            case 'map3d':
              this.directorise = this.$store.state.map3d.moduleDrectories;
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    },
    isActivated(value) {
      return this.activatedModule === value ? 'active' : null;
    },
    toggleModule(value, args) {
      // 1. 激活 -> 点击功能的按钮
      if (this.activatedModule !== value) {
        // 3. 关闭 -> 点击其他功能的按钮
        // TODO: 处理关闭原先功能时，watch回调延迟执行的问题
        if (this.activatedModule) {
          this.shutdown(this.activatedModule);
        }
        this.activatedModule = value;
        this.execute(value, ...args);
      } else {
        // 2. 关闭 -> 点击当前触发的功能的按钮
        this.activatedModule = '';
        this.shutdown(value);
      }
    },
  },
  computed: {
    ...mapState(['currentScene', 'currentMap']),
  },
  watch: {
    currentScene(newScene) {
      this.getDirectorise();
      this.setExecutorMode(newScene);
    },
    currentMap(newMap) {
      this.getDirectorise();
      this.setExecutorMode(newMap);
    },
  },
  mounted() {
    this.getDirectorise();
    this.setExecutorMode(this.currentScene);
  },
};
</script>

<style lang="less" scoped>
.kn-module-cotroller {
  width: inherit;
  display: flex;
  flex: 1;
  flex-direction: row;
  background-color: rgb(255, 255, 255);
  .module-title {
    width: 30px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #fff;
    background-color: #f4a031;
  }
  .module-directories {
    width: 320px;
    display: flex;
    flex-direction: column;
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
      .active {
        background: #f38031;
        border-color: #f38031;
        color: #fff;
      }
    }
  }
}
</style>
