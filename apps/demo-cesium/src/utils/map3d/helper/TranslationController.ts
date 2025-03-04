import { CallbackPositionProperty, Cartesian3, Color, Math as CsMath, Entity, Matrix3, Matrix4, Primitive, PrimitiveCollection, ScreenSpaceEventHandler, ScreenSpaceEventType, Viewer } from 'cesium'
import { ArrowPolylinePrimitive } from '../primitive'

type TranslationControllerAxisStyleOptions = {
  width?: number
  arrowWidth?: number
  length?: number
  arrowLength?: number
}

type TranslationControllerOptions = {
  viewer: Viewer
  target: Entity | Primitive | Cartesian3
  style: TranslationControllerAxisStyleOptions
}

class TranslationController {
  _viewer: Viewer
  _target: Entity | Primitive | Cartesian3 // TODO: 后续支持模型位置编辑
  _position: Cartesian3
  _axises: PrimitiveCollection
  _xAxis: ArrowPolylinePrimitive
  _yAxis: ArrowPolylinePrimitive
  _zAxis: ArrowPolylinePrimitive

  _startPosition: Cartesian3
  _endPosition: Cartesian3

  constructor(options: TranslationControllerOptions) {
    this._viewer = options.viewer
    this._target = options.target
    this._axises = new PrimitiveCollection()

    // 只维护该属性，同步变换目标点位
    let position: Cartesian3
    if (this._target instanceof Cartesian3) {
      position = this._target
    }
    else if (this._target instanceof Entity) {
      position = this._target.position.getValue()
      this._target.position = new CallbackPositionProperty(() => {
        return this._position
      }, false)
    }

    this._createAxises(position, options.style)

    this._registerEvent()
  }

  get xAxis() {
    return this._xAxis
  }

  get yAxis() {
    return this._yAxis
  }

  get zAxis() {
    return this._zAxis
  }

  _createAxises(origin: Cartesian3, style: TranslationControllerAxisStyleOptions) {
    const {
      width,
      arrowWidth,
      length = 100,
      arrowLength,
    } = style

    this._position = origin

    this._xAxis = new ArrowPolylinePrimitive({
      id: 'xAxis',
      position: origin,
      color: Color.RED,
      width,
      arrowWidth,
      length,
      arrowLength,
    })
    this._yAxis = new ArrowPolylinePrimitive({
      id: 'yAxis',
      position: origin,
      color: Color.GREEN,
      width,
      arrowWidth,
      length,
      arrowLength,
    })
    this._zAxis = new ArrowPolylinePrimitive({
      id: 'zAxis',
      position: origin,
      color: Color.BLUE,
      width,
      arrowWidth,
      length,
      arrowLength,
    })

    const mx = Matrix3.fromRotationY(CsMath.toRadians(90))
    const rtX = Matrix4.fromRotationTranslation(mx, new Cartesian3(length / 2, 0, 0))
    Matrix4.multiply(this._xAxis.primitive.modelMatrix, rtX, this._xAxis.primitive.modelMatrix)

    const my = Matrix3.fromRotationX(CsMath.toRadians(-90))
    const rtY = Matrix4.fromRotationTranslation(my, new Cartesian3(0, length / 2, 0))
    Matrix4.multiply(this._yAxis.primitive.modelMatrix, rtY, this._yAxis.primitive.modelMatrix)

    const tZ = Matrix4.fromTranslation(new Cartesian3(0, 0, length / 2))
    Matrix4.multiply(this._zAxis.primitive.modelMatrix, tZ, this._zAxis.primitive.modelMatrix)

    this._axises.add(this._xAxis.primitive)
    this._axises.add(this._yAxis.primitive)
    this._axises.add(this._zAxis.primitive)
    this._viewer.scene.primitives.add(this._axises)
  }

  _registerEvent() {
    this._viewer.screenSpaceEventHandler.setInputAction((e: ScreenSpaceEventHandler.PositionedEvent) => {
      const { position } = e
      const pick = this._viewer.scene.pick(position)
      if (!pick) return

      const { id } = pick
      this._startPosition = this._viewer.scene.pickPosition(position)
      this._viewer.scene.screenSpaceCameraController.enableRotate = false // 禁止镜头旋转，防止场景位移

      this._viewer.screenSpaceEventHandler.setInputAction((e: ScreenSpaceEventHandler.MotionEvent) => {
        // 注册拖拽移动事件
        const { startPosition, endPosition } = e
        const start = this._viewer.scene.globe.pick(this._viewer.camera.getPickRay(startPosition), this._viewer.scene)
        const end = this._viewer.scene.globe.pick(this._viewer.camera.getPickRay(endPosition), this._viewer.scene)
        const offset = Cartesian3.subtract(end, start, new Cartesian3()) // 向量

        console.log(`
          x:${offset.x}
          y:${offset.y}
          z:${offset.z}
        `)

        if (['xAxis-line', 'xAxis-arrow'].includes(id)) {
          // 移动坐标轴
          Matrix4.multiply(this._xAxis.primitive.modelMatrix, Matrix4.fromTranslation(new Cartesian3(0, 0, -offset.x)), this._xAxis.primitive.modelMatrix)
          Matrix4.multiply(this._yAxis.primitive.modelMatrix, Matrix4.fromTranslation(new Cartesian3(-offset.x, 0, 0)), this._yAxis.primitive.modelMatrix)
          Matrix4.multiply(this._zAxis.primitive.modelMatrix, Matrix4.fromTranslation(new Cartesian3(-offset.x, 0, 0)), this._zAxis.primitive.modelMatrix)
          // 更新点位
          if (this._target instanceof Entity) {
            this._position.x += offset.x
          }
        }
        else if (['yAxis-line', 'yAxis-arrow'].includes(id)) {
          Matrix4.multiply(this._xAxis.primitive.modelMatrix, Matrix4.fromTranslation(new Cartesian3(0, -offset.y, 0)), this._xAxis.primitive.modelMatrix)
          Matrix4.multiply(this._yAxis.primitive.modelMatrix, Matrix4.fromTranslation(new Cartesian3(0, 0, -offset.y)), this._yAxis.primitive.modelMatrix)
          Matrix4.multiply(this._zAxis.primitive.modelMatrix, Matrix4.fromTranslation(new Cartesian3(0, -offset.y, 0)), this._zAxis.primitive.modelMatrix)
          if (this._target instanceof Entity) {
            this._position.y += offset.y
          }
        }
        else if (['zAxis-line', 'zAxis-arrow'].includes(id)) {
          Matrix4.multiply(this._xAxis.primitive.modelMatrix, Matrix4.fromTranslation(new Cartesian3(-offset.z, 0, 0)), this._xAxis.primitive.modelMatrix)
          Matrix4.multiply(this._yAxis.primitive.modelMatrix, Matrix4.fromTranslation(new Cartesian3(0, -offset.z, 0)), this._yAxis.primitive.modelMatrix)
          Matrix4.multiply(this._zAxis.primitive.modelMatrix, Matrix4.fromTranslation(new Cartesian3(0, 0, offset.z)), this._zAxis.primitive.modelMatrix)
          if (this._target instanceof Entity) {
            this._position.z += offset.z
          }
        }
        // 改变target的具体分量的位置
      }, ScreenSpaceEventType.MOUSE_MOVE)
      this._viewer.screenSpaceEventHandler.setInputAction(() => {
        this._viewer.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE)
        this._viewer.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_UP)
        this._viewer.scene.screenSpaceCameraController.enableRotate = true
      }, ScreenSpaceEventType.LEFT_UP)
    }, ScreenSpaceEventType.LEFT_DOWN)
  }
}

export default TranslationController
