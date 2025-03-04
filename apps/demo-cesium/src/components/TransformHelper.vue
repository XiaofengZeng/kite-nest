<script setup lang="ts">
import { onMounted } from 'vue'
import { initViewer } from '../utils/map3d/viewer'
import { Cartesian3, HeadingPitchRange, Math as CsMath } from 'cesium'
import { TransformHelper } from '../utils/map3d'

defineOptions({
  name: 'TransformHelper',
})

onMounted(() => {
  const viewer = initViewer('cesium-wrapper')
  viewer.scene.debugShowFramesPerSecond = true

  const origin = Cartesian3.fromDegrees(114.0, 23.0, 100) // 原点
  const AXIS_LENGTH = 100
  // NOTE: Debbug
  const debugPoint = viewer.entities.add({
    position: origin,
    point: {
      pixelSize: 50,
    },
  })
  new TransformHelper({
    viewer,
    target: debugPoint,
    style: {
      length: AXIS_LENGTH,
    },
  })

  viewer.zoomTo(debugPoint, new HeadingPitchRange(CsMath.toRadians(45), CsMath.toRadians(-45), 500))
})

</script>

<template>
  <div id="cesium-wrapper" />
</template>

<style scoped>
#cesium-wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #666;
}
</style>
