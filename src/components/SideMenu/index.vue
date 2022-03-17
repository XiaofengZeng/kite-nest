<template>
  <!-- 主页-侧边菜单栏 -->
  <div class="kn-side-menu" :class="activeClass">
    <div class="menu-body">
      <p>SideMenu</p>
    </div>
    <div class="expend-btn" @click="toggleMenu">
      <span :class="arrowClass"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
  data() {
    return {
      isActivated: false,
    };
  },
  mounted() {
    // TODO: 有待商榷是否合理
    setTimeout(() => {
      this.isActivated = true;
    }, 100);
  },
  methods: {
    toggleMenu() {
      this.isActivated = !this.isActivated;
    },
  },
  computed: {
    activeClass() {
      return this.isActivated ? 'active' : null;
    },
    arrowClass() {
      return this.isActivated ? 'el-icon-arrow-left' : 'el-icon-arrow-right';
    },
  },
};
</script>

<style lang="less" scoped>
  .kn-side-menu {
    // width: 370px;
    left: -350px;
    height: inherit;
    display: flex;
    position: absolute;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: all 1s cubic-bezier(0.1, 1, 1, 1);
    .menu-body {
      width: 350px;
      height: inherit;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(211, 220, 230, 0.5);
    }
    .expend-btn {
      background-color: rgba(115, 119, 124, 0.5);
      width: 20px;
      height: 80px;
      line-height: 80px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
  .active {
    left: 0px;
  }
</style>
