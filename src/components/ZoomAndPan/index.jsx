import { useRef, useState } from 'react'
import FluidContainer from '../FluidContainer'
import PropTypes from 'prop-types'
import { useTransition } from '../../contexts/transition'
import stringifyTranslate from './functions/stringifyTranslate'
import calcTransition from './functions/calcTransition'
import getPointerPosition from './functions/getPointerPosition'
import calcAspectRatio from './functions/calcAspectRatio'
import './index.css'

const RMB = 2

const ZoomAndPan = ({ children: Content, speed = 0.1 }) => {
  const [{ width, height }, setSize] = useState({})
  const [transition, setTransition, reset] = useTransition()
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
    <FluidContainer>
      <div
        className="znp_wrapper"
        ref={wrapperRef}
        style={Object.assign(
          {
            aspectRatio: calcAspectRatio(width, height),
            scale: String(transition.scale),
            translate: stringifyTranslate(transition.x, transition.y),
          },
          width > height ? { width, height: 'auto' } : { height, width: 'auto' }
        )}
        onWheel={onWheel}
        onMouseMove={onMouseMove}
      >
        <Content
          setSize={(...args) => {
            reset()
            setSize(...args)
          }}
        />
      </div>
    </FluidContainer>
  )
}

ZoomAndPan.propTypes = {
  aspectRatio: PropTypes.string,
  speed: PropTypes.number,
  children: PropTypes.func,
}

export default ZoomAndPan
