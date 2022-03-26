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
                    @click="toggleModule(item.enName)"
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

import Executor from '@/components/Map/mixin/Executor';

import drawingHelper from '@/components/Map/mixin/interaction/DrawingHelper';

export default {
  name: 'ModuleController',
  components: {},
  data() {
    return {
      directorise: [],
    };
  },
  mixins: [Executor, drawingHelper],
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
    // TODO: 触发功能，执行相关方法
    toggleModule(value) {
      if (this.activatedModule !== value) {
        this.activatedModule = value;
        // this.$store.commit('map2d/addToActivatedModules', value);
        // this.$store.commit('map2d/setActivatedModule', value);
        // this.$store.commit('map2d/setActivatedModule', value);
        this.execute(value);
      } else {
        this.activatedModule = '';
        // this.$store.commit('map2d/romoveFromActivatedModules', value);
      }
    },
  },
  computed: {
    ...mapState(['currentScene', 'currentMap']),
  },
  watch: {
    currentScene(newVal) {
      this.getDirectorise(newVal);
    },
    currentMap(newVal) {
      this.getDirectorise(newVal);
    },
  },
  mounted() {
    this.getDirectorise();
  },
  beforeUpdate() {
    this.setDrawingMode(this.currentMap);
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
