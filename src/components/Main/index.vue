<template>
  <!-- 主页-主要内容 -->
  <div class="kn-main">
    <slot name="scene"></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Main',
  computed: {
    ...mapState(['scenes', 'maps']),
  },
  beforeUpdate() {
    // 在使用URL跳转主界面时，进行判断并将值设置进Vuex中
    this.scenes.forEach((s) => {
      if (this.$router.currentRoute.path.indexOf(s.path) > -1) {
        this.$store.commit('setScene', s.key);
      }
    });
    this.maps.forEach((m) => {
      if (this.$router.currentRoute.path.indexOf(m.path) > -1) {
        this.$store.commit('setMap', m.key);
      }
    });
  },
};
</script>

<style lang="less" scoped>
.kn-main {
  display: flex;
  flex: 1 1 auto;
  text-align: center;
  align-items: center;
  justify-content: center;
}
</style>
