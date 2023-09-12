import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useTransition } from '../../contexts/transition'
import stringifyTranslate from './functions/stringifyTranslate'
import calcTransition from './functions/calcTransition'
import getPointerPosition from './functions/getPointerPosition'
import './index.css'

const RMB = 2

const ZoomAndPan = ({ children: Content, speed = 0.1 }) => {
  const [aspectRatio, setAspectRatio] = useState()
  const [transition, setTransition] = useTransition()
  const wrapperRef = useRef(null)

  const onWheel = (event) => {
    const deltaScale = -speed * Math.max(-1, Math.min(1, event.deltaY))

    //ToDo: add useDebounse hook
    if (transition.scale <= speed && deltaScale < 0) return

    const wrapper = wrapperRef.current

    setTransition(
      calcTransition(getPointerPosition(event, wrapper), transition, deltaScale)
    )
  }

  const onMouseMove = (event) => {
    event.stopPropagation()
    if (event.buttons !== RMB) return

    const { movementX, movementY } = event
    const { x, y } = transition
    const { clientWidth, clientHeight } = wrapperRef.current

    setTransition({
      x: movementX / clientWidth + x,
      y: movementY / clientHeight + y,
    })
  }

  return (
    <div
      className="image_wrapper"
      ref={wrapperRef}
      style={{
        aspectRatio,
        scale: String(transition.scale),
        translate: stringifyTranslate(transition.x, transition.y),
      }}
      onWheel={onWheel}
      onMouseMove={onMouseMove}
    >
      <Content setAspectRatio={setAspectRatio} />
    </div>
  )
}

ZoomAndPan.propTypes = {
  aspectRatio: PropTypes.number,
  speed: PropTypes.number,
  children: PropTypes.func,
}

export default ZoomAndPan
