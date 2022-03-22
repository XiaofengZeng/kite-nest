<template>
  <ul>
    <li v-for="i in list" :key="i.id">
      <el-button
        type="primary"
        plain
        :class="isActivated(i.enName)"
        @click="toggleModule(i.enName)"
      >
        {{ i.cnName }}
      </el-button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ModuleItem',
  props: {
    list: Array,
  },
  data() {
    return {
      activatedModule: '',
    };
  },
  methods: {
    isActivated(value) {
      return this.activatedModule === value ? 'active' : null;
    },
    // TODO: 触发功能，执行相关方法
    toggleModule(value) {
      if (this.activatedModule !== value) {
        this.activatedModule = value;
        // this.$store.commit('map2d/addToActivatedModules', value);
        this.$store.commit('map2d/setActivatedModule', value);
      } else {
        this.activatedModule = '';
        // this.$store.commit('map2d/romoveFromActivatedModules', value);
      }
    },
  },
};
</script>

<style lang="less" scoped>
ul {
  width: inherit;
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  li {
    display: inline;
    margin: 5px;
  }
  .active {
    background: #f38031;
    border-color: #f38031;
    color: #fff;
  }
}
</style>
