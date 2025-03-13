import { Cartesian3, Cartesian2, CylinderGeometry, Primitive, GeometryInstance, ColorGeometryInstanceAttribute, PerInstanceColorAppearance, Quaternion, ScreenSpaceEventHandler, ScreenSpaceEventType, Transforms, Matrix4, Matrix3, Color } from 'cesium'

class TranslationControllerTest {
  constructor(viewer, target) {
    this.model = target
    this.scene = viewer.scene
    this.axes = {}
    this.dragging = false
    this.currentAxis = null
    this.startPosition = new Cartesian3()
    this.startScreenPosition = new Cartesian2()
    this.sensitivity = 0.001

    this.initAxes()
    this.bindEvents()
  }

  initAxes() {
    const createAxis = (axis, color) => {
      const geometry = new CylinderGeometry({
        length: 10,
        topRadius: 0.3,
        bottomRadius: 0.3,
        orientation: this.getAxisOrientation(axis),
      })

      return new Primitive({
        geometryInstances: new GeometryInstance({
          geometry,
          attributes: {
            color: ColorGeometryInstanceAttribute.fromColor(color),
          },
        }),
        appearance: new PerInstanceColorAppearance({
          flat: true,
          translucent: false,
        }),
      })
    }

    // 创建XYZ轴
    this.axes.x = {
      primitive: createAxis('x', Color.RED),
      axis: 'x',
    }
    this.axes.y = {
      primitive: createAxis('y', Color.GREEN),
      axis: 'y',
    }
    this.axes.z = {
      primitive: createAxis('z', Color.BLUE),
      axis: 'z',
    }

    // 添加到场景
    Object.values(this.axes).forEach((axis) => {
      this.scene.primitives.add(axis.primitive)
    })

    this.updateAxesPosition(this.model.position.getValue())
  }

  getAxisOrientation(axis) {
    const quaternion = new Quaternion()
    switch (axis) {
      case 'x': // 绕Z轴旋转-90度
        return Quaternion.fromAxisAngle(Cartesian3.UNIT_Y, -Math.PI / 2)
        // return Quaternion.IDENTITY
      case 'y': // 默认方向即为Y轴
        return Quaternion.IDENTITY
      case 'z': // 绕X轴旋转90度
        return Quaternion.fromAxisAngle(Cartesian3.UNIT_X, Math.PI / 2)
    }
    return quaternion
  }

  bindEvents() {
    const handler = new ScreenSpaceEventHandler(this.scene.canvas)
    const self = this

    handler.setInputAction((movement) => {
      const picked = self.scene.pick(movement.position)
      if (!picked) return

      const axis = Object.values(self.axes).find(a => a.primitive === picked.primitive)
      if (axis) {
        this.scene.screenSpaceCameraController.enableRotate = false
        self.dragging = true
        self.currentAxis = axis.axis
        Cartesian3.clone(self.model.position.getValue(), self.startPosition)
        Cartesian2.clone(movement.position, self.startScreenPosition)
      }
    }, ScreenSpaceEventType.LEFT_DOWN)

    handler.setInputAction((movement) => {
      if (!self.dragging) return

      const currentPosition = movement.endPosition
      const camera = self.scene.camera

      // 计算位移向量
      const deltaX = currentPosition.x - self.startScreenPosition.x
      const deltaY = currentPosition.y - self.startScreenPosition.y

      // 获取相机方向向量
      const right = camera.right
      const up = camera.up
      const distance = Cartesian3.distance(camera.position, self.startPosition)

      // 计算位移量
      const displacement = new Cartesian3()
      const deltaRight = deltaX * distance * self.sensitivity
      const deltaUp = -deltaY * distance * self.sensitivity

      Cartesian3.multiplyByScalar(right, deltaRight, displacement)
      Cartesian3.add(
        displacement,
        Cartesian3.multiplyByScalar(up, deltaUp, new Cartesian3()),
        displacement,
      )

      // 投影到当前轴
      let axisVec
      switch (self.currentAxis) {
        case 'x':
          axisVec = Cartesian3.UNIT_X
          break
        case 'y':
          axisVec = Cartesian3.UNIT_Y
          break
        case 'z':
          axisVec = Cartesian3.UNIT_Z
          break
      }

      const scalar = Cartesian3.dot(displacement, axisVec)
      const projected = Cartesian3.multiplyByScalar(axisVec, scalar, new Cartesian3())

      // 更新模型位置
      const newPosition = Cartesian3.add(self.startPosition, projected, new Cartesian3())
      self.model.position = newPosition

      // 更新坐标轴位置
      self.updateAxesPosition(newPosition)
    }, ScreenSpaceEventType.MOUSE_MOVE)

    handler.setInputAction(() => {
      self.dragging = false
      self.currentAxis = null
      this.scene.screenSpaceCameraController.enableRotate = true
    }, ScreenSpaceEventType.LEFT_UP)
  }

  updateAxesPosition(position) {
    Object.values(this.axes).forEach((axis) => {
      const modelMatrix = Transforms.eastNorthUpToFixedFrame(position)
      Matrix4.multiplyByMatrix3(
        modelMatrix,
        Matrix3.fromQuaternion(this.getAxisOrientation(axis.axis)),
        modelMatrix,
      )
      axis.primitive.modelMatrix = modelMatrix
    })
  }

  destroy() {
    Object.values(this.axes).forEach((axis) => {
      this.scene.primitives.remove(axis.primitive)
    })
  }
}
export default TranslationControllerTest

// 使用示例
// const viewer = new Viewer('cesiumContainer')
// Model.fromGltf({
//   url: './model.gltf',
//   modelMatrix: Transforms.eastNorthUpToFixedFrame(Cartesian3.fromDegrees(-123.0744619, 44.0503706)),
// }).then((model) => {
//   viewer.scene.primitives.add(model)
//   const controller = new ModelPositionController(model, viewer.scene)
// })
