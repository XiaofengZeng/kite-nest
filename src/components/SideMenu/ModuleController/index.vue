<template>
  <div class="kn-module-cotroller">
    <div class="module-title">
      <span>功能模块</span>
    </div>
    <div class="module-directories">
      <ModuleDirectory
        v-for="d in directorise"
        :key="d.key"
        :item="d"
      ></ModuleDirectory>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ModuleDirectory from './ModuleDirectory';

export default {
  name: 'ModuleController',
  components: {
    ModuleDirectory,
  },
  data() {
    return {
      directorise: [],
    };
  },
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
          this.directorise = this.$store.state.map2d.moduleDrectories;
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    this.getDirectorise();
  },
  computed: {
    ...mapState(['currentScene']),
  },
  watch: {
    currentScene(_, newVal) {
      this.getDirectorise(newVal);
    },
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
  }
  .active {
    background: #f38031;
    border-color: #f38031;
    color: #fff;
  }
}
</style>
