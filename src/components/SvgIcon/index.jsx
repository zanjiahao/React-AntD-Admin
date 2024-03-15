import { useMemo } from 'react'
import './index.scss'

/**
 * @Svg组件
 * @props  color   图标颜色
 * @props  name 图标名称--文件名称
 * @props  size  图标大小
 * @props  prefix 前缀 默认icon
 */
const SvgIcon = (props) => {
  const _prefix = props.prefix || 'icon'
  const _className = props.className ? 'svg-icon ' + props.className : 'svg-icon'
  const iconName = useMemo(() => `#${_prefix}-${props.name}`, [_prefix, props.name])
  return (
    <>
      <svg aria-hidden="true" className={_className} >
        <use href={iconName} xlinkHref={iconName} />
      </svg>
    </>
  )
}

export default SvgIcon
