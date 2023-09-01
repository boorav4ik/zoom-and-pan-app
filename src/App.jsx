import { useRef, useState } from 'react'

import './App.css'

const speed = .1;
const translateRegExp = /(?<tX>\-?\d+(\.\d+)?)px (?<tY>\-?\d+(\.\d+)?)px/

function App() {
  const containerRef = useRef(null)
  const [count, setCount] = useState(0)

  const onWheel = (event) => {
    event.stopPropagation()
    // console.log(event);
    const container = containerRef.current
    const { offsetLeft, offsetTop, style } = container
    const { pageX, pageY, deltaY } = event
    const scale = Number(style.scale || "1")
    const { tX = 0, tY = 0 } = style.translate.match(translateRegExp)?.groups ?? {}
    const point = { x: pageX - offsetLeft, y: pageY - offsetTop }
    const target = { x: (point.x - tX) / scale, y: (point.y - tY) / scale }
    const newScale = scale - 1 * Math.max(-1, Math.min(1, deltaY)) * speed * scale

    // console.log(deltaY,newScale);
    const translate = { x: -target.x * newScale + point.x, y: -target.y * newScale + point.y }
    // console.log(newScale, translate);
    style.scale = newScale
    style.translate = `${translate.x}px ${translate.y}px`

  }
  return (
    <section>
      <div onWheel={onWheel} className='zoom_container' ref={containerRef}>
        <img src='sky.jpg' />
      </div>
    </section>
  )
}

export default App
