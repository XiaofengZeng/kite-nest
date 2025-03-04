import { Cartesian3, Color, CylinderGeometry, Geometry, GeometryInstance, Material, MaterialAppearance, PointPrimitive, Primitive, Transforms } from 'cesium'

export type ArrowPolylinePrimitiveOptions = {
  id: string
  position: Cartesian3
  color?: Color
  width?: number
  arrowWidth?: number
  length?: number
  arrowLength?: number
}

/**
 * 箭头线(圆柱+圆锥)
 */
class ArrowPolylinePrimitive {
  id: string
  position: Cartesian3
  _color: Color
  _width: number
  _arrowWidth: number
  _length: number
  _arrowLength: number
  _primitive: Primitive
  constructor(option: ArrowPolylinePrimitiveOptions) {
    this._color = option.color || Color.RED
    this._width = option.width || 3
    this._arrowWidth = option.arrowWidth || 2 * this._width
    this._length = option.length || 100
    this._arrowLength = option.arrowLength || 10
    this.position = option.position

    const id = option.id

    const line = CylinderGeometry.createGeometry(new CylinderGeometry({
      length: this._length,
      topRadius: this._width,
      bottomRadius: this._width,
    }))

    const arrow = CylinderGeometry.createGeometry(new CylinderGeometry({
      length: this._arrowLength,
      topRadius: 0,
      bottomRadius: this._arrowWidth,
    }))

    const offset = (this._length + this._arrowLength) / 2
    this._translate(arrow, [0, 0, offset])

    this._primitive = new Primitive({
      modelMatrix: Transforms.eastNorthUpToFixedFrame(this.position),
      geometryInstances: [
        new GeometryInstance({
          id: id + '-line',
          geometry: line,
        }),
        new GeometryInstance({
          id: id + '-arrow',
          geometry: arrow,
        }),
      ],
      appearance: new MaterialAppearance({
        material: Material.fromType('Color', {
          color: this._color,
        }),
      }),
      asynchronous: false, // TODO: 异步加载
    })
  }

  get primitive() {
    return this._primitive
  }

  /**
   * 移动圆锥
   * @private
   */
  private _translate(geometry: Geometry, offset: Cartesian3 | number[]) {
    const targetOffset = new Cartesian3()
    if (Array.isArray(offset)) {
      targetOffset.x = offset[0]
      targetOffset.y = offset[1]
      targetOffset.z = offset[2]
    }
    else {
      Cartesian3.clone(offset, targetOffset)
    }

    for (let i = 0; i < geometry.attributes.position.values.length; i += 3) {
      geometry.attributes.position.values[i] += targetOffset.x
      geometry.attributes.position.values[i + 1] += targetOffset.y
      geometry.attributes.position.values[i + 2] += targetOffset.z
    }
  }
}

export default ArrowPolylinePrimitive
