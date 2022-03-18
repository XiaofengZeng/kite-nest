<template>
  <!-- 主页-主要内容 -->
  <div class="kn-main">
    <slot name="scene"></slot>
  </div>
</template>

<script>
export default {
  name: 'Main',
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
