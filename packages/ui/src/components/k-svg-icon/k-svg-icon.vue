<template>
  <icon
    ref="iconRef"
    :class="iconClasses"
  >
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
  name: 'KSvgIcon',
})

const DEFAULT_TYPE = 'primary'

/**
 * 类型颜色
 */
const typeColor = {
  primary: '#0f74fe',
  danger: '#f56c6c',
}

const props = withDefaults(defineProps<IKSvgIconProps>(), {
  type: DEFAULT_TYPE,
  initColor: '#666',
  hoverColor: typeColor[DEFAULT_TYPE],
  activatedColor: typeColor[DEFAULT_TYPE],
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
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: v-bind('props.size');
  height: v-bind('props.size');
  // stroke: currentColor;
  overflow: hidden;
  font-size: v-bind('props.size');
  color: v-bind('props.initColor');
  outline: none; // 去除默认轮廓，防止点击时触发
  // vertical-align: -0.15em;
  fill: currentcolor;
  transition: color 0.3s ease;

  &:hover {
    color: v-bind('iconHoverColor');
  }
}

.is-active {
  color: v-bind('iconActivatedColor');
}
</style>
