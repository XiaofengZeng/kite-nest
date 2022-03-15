<template>
  <!-- 主页-侧边菜单栏 -->
  <div class="kn-side-menu">
    <p>SideMenu</p>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
};
</script>

<style lang="less" scoped>
  .kn-side-menu {
    width: 350px;
    height: inherit;
    display: flex;
    position: absolute;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: rgba(211, 220, 230, 0.5);
  }
</style>
