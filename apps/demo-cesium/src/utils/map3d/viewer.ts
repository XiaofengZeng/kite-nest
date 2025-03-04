import { Viewer } from 'cesium'

export const initViewer = (element: HTMLElement | string) => {
  const viewer = new Viewer(element, {
    animation: false, // 关闭动画控件
    baseLayerPicker: false, // 关闭底图选择器
    fullscreenButton: false, // 关闭全屏按钮
    geocoder: false, // 关闭地理编码搜索
    homeButton: false, // 关闭主页按钮
    infoBox: false, // 关闭信息框
    sceneModePicker: false, // 关闭场景模式选择器
    selectionIndicator: false, // 关闭选择指示器
    timeline: false, // 关闭时间轴
    navigationHelpButton: false, // 关闭导航帮助按钮
    skyBox: false, // 关闭天空盒

    // requestRenderMode: true,
    // maximumRenderTimeChange: Infinity,
  })
  viewer.resolutionScale = window.devicePixelRatio

  return viewer
}
