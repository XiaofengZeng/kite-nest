<template>
  <el-switch
    :style="centerStyle"
    v-model="is3dMap"
    active-color="#6dabe4"
    inactive-color="#7a9c49"
    active-text="三维"
    inactive-text="二维"
    @change="switchMap"
  >
  </el-switch>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MapSwitcher',
  data() {
    return {
      // 不用is2dMap判断是为了用户体验(el-switch的使用体验)
      is3dMap: false,
      centerStyle: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    };
  },
  computed: {
    ...mapState(['currentMap', 'maps']),
  },
  watch: {
    currentMap(newVal) {
      this.is3dMap = newVal === 'map3d';
    },
  },
  methods: {
    switchMap(is3d) {
      let path = '';
      const mode = is3d ? 'map3d' : 'map2d';
      this.maps.forEach((map) => {
        if (map.key === mode) {
          path = map.path;
        }
      });
      this.$store.commit('setMap', mode);
      this.$router.push(path);
    },
  },
};
</script>

<style>
</style>
