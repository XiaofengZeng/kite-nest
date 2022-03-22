<template>
  <div class="directory">
    <div class="directory-title">
      {{ item.title }}
    </div>
    <div class="directory-item">
      <ModuleItem :list="item.list"></ModuleItem>
    </div>
  </div>
</template>

<script>
import ModuleItem from '../ModuleItem';

export default {
  name: 'ModuleDirectory',
  components: {
    ModuleItem,
  },
  props: {
    item: Object, // 当前所在场景
  },
};
</script>

<style>
</style>
