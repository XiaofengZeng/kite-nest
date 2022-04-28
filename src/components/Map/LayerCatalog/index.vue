<template>
  <div class="kn-layer-catalog" :class="isActivated ? 'active' : null">
    <div class="tag" @click="toggleCatalog">图层目录</div>
    <div class="catalog">
      <el-tree
        :data="layerList"
        show-checkbox
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
        @check-change="toggleLayer"
        :default-checked-keys="defaultCheckedKeys"
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
      defaultCheckedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
    };
  },
  computed: {
    ...mapState(['currentMap']),
  },
  watch: {
    currentMap(val) {
      const catalog = this.getCatalogByMapType(val);
      this.layerList = catalog.list;
      this.defaultCheckedKeys = catalog.keys;
    },
  },
  methods: {
    // 抽屉开关
    toggleCatalog() {
      this.isActivated = !this.isActivated;
    },
    // 获取图层列表
    getCatalogByMapType(type) {
      let layerlist = [];
      let defaultCheckedList = [];
      switch (type.toLowerCase()) {
        case 'map2d':
          layerlist = this.$store.state.map2d.layerDirectories;
          defaultCheckedList = this.$store.state.map2d.defaultCheckedKeys;
          break;
        case 'map3d':
          layerlist = this.$store.state.map3d.layerDirectories;
          defaultCheckedList = this.$store.state.map2d.defaultCheckedKeys;
          break;
        default:
          break;
      }
      return {
        list: layerlist,
        keys: defaultCheckedList,
      };
    },
    // 加载图层
    toggleLayer(layerNode, checked) {
      const curMap = this.currentMap.toLowerCase();
      if (!layerNode.children) {
        // 当没有子节点，则表示该节点是图层
        const layerInfo = {
          id: layerNode.id,
          name: layerNode.name,
          type: layerNode.type,
          url: layerNode.url,
        };
        if (checked) {
          if (curMap === 'map2d') {
            this.$store.commit('layerContainer/add2dLayer', layerInfo);
          } else if (curMap === 'map3d') {
            this.$store.commit('layerContainer/add3dLayer', layerInfo);
          }
        } else {
          if (curMap === 'map2d') {
            this.$store.commit('layerContainer/remove2dLayer', layerInfo);
          } else if (curMap === 'map3d') {
            this.$store.commit('layerContainer/remove3dLayer', layerInfo);
          }
        }
      }
    },
  },
  mounted() {
    const catalog = this.getCatalogByMapType(this.currentMap.toLowerCase());
    this.layerList = catalog.list;
    this.defaultCheckedKeys = catalog.keys;
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
