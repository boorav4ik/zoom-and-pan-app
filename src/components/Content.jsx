import { useEffect, useRef } from 'react'

import PropTypes from 'prop-types'

const eventPreventDefault = (e) => e.preventDefault()

const Content = ({ setAspectRatio }) => {
  const canvasRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const image = imageRef.current
    const canvas = canvasRef.current

    image.onload = function () {
      const { naturalWidth, naturalHeight } = this
      canvas.width = naturalWidth
      canvas.height = naturalHeight

      setAspectRatio(naturalWidth / naturalHeight)
    }
  }, [setAspectRatio])
  return (
    <>
      <img ref={imageRef} src="sky.jpg" onContextMenu={eventPreventDefault} />
      <canvas ref={canvasRef} onContextMenu={eventPreventDefault} />
    </>
  )
}

Content.propTypes = {
  setAspectRatio: PropTypes.func.isRequired,
}

export default Content
