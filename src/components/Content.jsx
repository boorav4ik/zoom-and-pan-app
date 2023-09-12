import { useRef } from 'react'
import PropTypes from 'prop-types'

const eventPreventDefault = (e) => e.preventDefault()

const Content = ({ src, setSize = () => undefined }) => {
  const canvasRef = useRef(null)

  const onImageLoad = ({ target }) => {
    const { naturalWidth: width, naturalHeight: height } = target

    const canvas = canvasRef.current
    canvas.width = width
    canvas.height = height

    setSize({ width, height })
  }

  return (
    <>
      <img src={src} onLoad={onImageLoad} onContextMenu={eventPreventDefault} />
      <canvas ref={canvasRef} onContextMenu={eventPreventDefault} />
    </>
  )
}

Content.propTypes = {
  src: PropTypes.string.isRequired,
  setSize: PropTypes.func.isRequired,
}

export default Content
