<template>
  <icon ref="iconRef" :class="iconClasses">
    <slot />
  </icon>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'

export interface IKSvgIconProps {
  type?: 'primary' | 'danger' // icon类型，如果没有传入hover和activated的填充颜色，默认根据类型进行设置
  size?: string
  initColor?: string // 常规颜色
  hoverColor?: string // 鼠标悬停时颜色
  activatedColor?: string // 激活时的颜色
  isActive?: boolean
}

defineOptions({
  name: 'k-svg-icon',
})

/**
 * 类型颜色
 */
const typeColor = {
  primary: '#0f74fe',
  danger: '#f56c6c',
}

const props = withDefaults(defineProps<IKSvgIconProps>(), {
  type: 'primary',
  initColor: '#666',
  size: '1em',
  isActive: false,
})
const iconRef = useTemplateRef('iconRef')

const iconClasses = computed(() => {
  return ['svg-icon', props.isActive ? 'is-active' : '']
})

const iconHoverColor = computed(() => {
  return props.hoverColor || typeColor[props.type]
})

const iconActivatedColor = computed(() => {
  return props.activatedColor || typeColor[props.type]
})

defineExpose({
  iconRef,
})
</script>

<style scoped lang="scss">
.svg-icon {
  width: v-bind('props.size');
  height: v-bind('props.size');
  font-size: v-bind('props.size');

  color: v-bind('props.initColor');
  // vertical-align: -0.15em;
  fill: currentColor;
  // stroke: currentColor;
  overflow: hidden;
  outline: none; // 去除默认轮廓，防止点击时触发
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: color 0.3s ease;
  &:hover {
    color: v-bind('iconHoverColor');
  }
}
.is-active {
  color: v-bind('iconActivatedColor');
}
</style>
