<template>
  <!-- 主页 -->
  <div class="kn-home">
    <Header></Header>
    <Main>
      <template #scene>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </template>
    </Main>
    <SideMenu></SideMenu>
  </div>
</template>

<script>
import Header from '../Header/index.vue';
import Main from '../Main/index.vue';
import SideMenu from '../SideMenu/index.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Main,
    SideMenu,
  },
};
</script>

<style lang="less" scoped>
  .kn-home {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
