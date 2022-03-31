<template>
  <div class="kn-map">
    <router-view></router-view>
    <div class="map-switcher">
      <MapSwitcher></MapSwitcher>
    </div>
    <div class="layer-catalog">
      <LayerCatalog></LayerCatalog>
    </div>
  </div>
</template>

<script>
import MapSwitcher from '@/components/Map/MapSwitcher';
import LayerCatalog from '@/components/Map/LayerCatalog';

export default {
  name: 'MapView',
  components: {
    MapSwitcher,
    LayerCatalog,
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
  .layer-catalog {
    position: absolute;
    width: 250px;
    height: 350px;
    top: 120px;
    right: 0px;
    overflow: hidden;
  }
}
</style>
