<template>
  <div class="kn-layer-catalog" :class="activeClass">
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
export default {
  name: 'LayerCatalog',
  data() {
    return {
      isActivated: false,
      layerList: [
        {
          id: 1,
          label: '供应商',
        },
        {
          id: 2,
          label: '批发商',
        },
        {
          id: 3,
          label: '零售商',
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  computed: {
    activeClass() {
      return this.isActivated ? 'active' : null;
    },
  },
  methods: {
    toggleCatalog() {
      this.isActivated = !this.isActivated;
    },
  },
  mounted() {
    // TODO: 有待商榷是否合理
    setTimeout(() => {
      this.isActivated = true;
    }, 100);
  },
  activated() {
    this.isActivated = true;
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
  display: flex;
  flex-direction: row;
  transition: all 1s cubic-bezier(0.1, 1, 1, 1);
  overflow: hidden;
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
