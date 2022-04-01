<template>
  <div class="kn-layer-catalog" :class="isActivated ? 'active' : null">
    <div class="tag" @click="toggleCatalog">图层目录</div>
    <div class="catalog">
      <el-tree
        :data="layerList"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
      >
      </el-tree>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LayerCatalog',
  data() {
    return {
      isActivated: false,
      layerList: [],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  computed: {
    ...mapState(['currentMap']),
  },
  watch: {
    currentMap(val) {
      this.layerList = this.getCatalogByMapType(val);
    },
  },
  methods: {
    // 抽屉开关
    toggleCatalog() {
      this.isActivated = !this.isActivated;
    },
    // 获取图层列表
    getCatalogByMapType(type) {
      let list = [];
      switch (type.toLowerCase()) {
        case 'map2d':
          list = this.$store.state.map2d.layerDirectories;
          break;
        case 'map3d':
          list = this.$store.state.map3d.layerDirectories;
          break;
        default:
          break;
      }
      return list;
    },
  },
  mounted() {
    this.layerList = this.getCatalogByMapType(this.currentMap.toLowerCase());
    // TODO: 有待商榷是否合理
    setTimeout(() => {
      this.isActivated = true;
    }, 100);
  },
  activated() {
    setTimeout(() => {
      this.isActivated = true;
    }, 100);
  },
  deactivated() {
    this.isActivated = false;
  },
};
</script>

<style lang="less" scoped>
.kn-layer-catalog {
  width: 250px;
  height: 350px;
  position: absolute;
  right: -220px;
  top: 70px;
  display: flex;
  flex-direction: row;
  transition: all 1s cubic-bezier(0.1, 1, 1, 1);
  .tag {
    width: 30px;
    height: 100px;
    display: flex;
    color: #ffffff;
    font-weight: bold;
    align-items: center;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    background-color: rgba(245, 153, 90, 0.8);
    user-select: none;
    cursor: pointer;
  }
  .catalog {
    width: 220px;
    border: 4px solid #f5995a;
    padding: 6px 0;
    border-bottom-left-radius: 4px;
    background-color: rgb(255, 255, 255);
  }
}
.active {
  right: 0px;
}
</style>
