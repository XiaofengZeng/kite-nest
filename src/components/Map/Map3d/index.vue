<template>
  <div id="kn-map3d" class="kn-map3d-container"></div>
</template>

<script>
export default {
  name: 'Map3d',
  data() {
    return {
      map3d: null,
    };
  },
  methods: {
    createMap3d() {
      // const map = this.Cesium.Viewer('kn-map3d');
      // return map;
    },
  },
  mounted() {
    this.map3d = this.createMap3d();
  },
};
</script>

<style lang="less" scoped>
.kn-map3d-container {
  height: 100%;
  width: 100%;
}
</style>
