import { useEffect, useMemo, useRef, useState } from 'react'
import { TransitionProvider } from './contexts/transition'
import ZoomAndPan from './components/ZoomAndPan'
import ZoomTools from './components/ZoomToolbar'
import './App.css'

const eventPreventDefault = (e) => e.preventDefault()

function App() {
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  const [size, setSize] = useState({})

  const aspectRatio = useMemo(() => {
    if (size.height) return size.width / size.height
  }, [size])

  useEffect(() => {
    const image = imageRef.current
    image.onload = function () {
      setSize({
        width: this.naturalWidth,
        height: this.naturalHeight,
      })
    }
  }, [])

  return (
    <TransitionProvider>
      <header>
        <ZoomTools />
      </header>
      <section>
        <div className="container">
          <ZoomAndPan aspectRatio={aspectRatio}>
            <img
              ref={imageRef}
              src="sky.jpg"
              onContextMenu={eventPreventDefault}
            />
            <canvas
              ref={canvasRef}
              {...size}
              onContextMenu={eventPreventDefault}
            />
          </ZoomAndPan>
        </div>
      </section>
    </TransitionProvider>
  )
}

export default App
