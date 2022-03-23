<template>
  <div class="kn-map">
    <router-view></router-view>
    <div class="map-switcher">
      <MapSwitcher></MapSwitcher>
    </div>
  </div>
</template>

<script>
import MapSwitcher from '@/components/Map/MapSwitcher';

export default {
  name: 'MapView',
  components: {
    MapSwitcher,
  },
};
</script>

<style lang="less" scoped>
.kn-map {
  width: 100%;
  height: 100%;
  .map-switcher {
    position: absolute;
    width: 150px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 4px;
    right: 10px;
    top: 60px;
  }
}
</style>
