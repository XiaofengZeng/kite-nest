<template>
  <div class="kn-module-switcher">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ModuleSwitcher',
};
</script>

<style lang="less" scoped>
.kn-module-switcher {
  display: block;
  width: 85px;
  height: 30px;
  margin: 0 auto;
  line-height: 30px;
  border: 2px solid #f5995a;
  border-radius: 5px;
  user-select: none;
  cursor: pointer;
}
.kn-module-switcher:hover {
  background: #f38031;
  border-color: #f38031;
  color: #fff;
}
</style>
