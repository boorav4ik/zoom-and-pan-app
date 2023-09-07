import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import stringifyTranslate from "../../functions/stringifyTranslate";
import { useTransition } from "../../contexts/transition";
import "./index.css";

const getPointerPosition = ({ pageX, pageY }, { offsetLeft, offsetTop }) => ({
  x: pageX - offsetLeft,
  y: pageY - offsetTop,
});

const calcTransition = (position, translate, scale, deltaScale) => {
  const newScale = scale + deltaScale;

  const calcTranslate = (coordinate) =>
    position[coordinate] -
    (newScale * (position[coordinate] - translate[coordinate])) / scale;

  return { scale: newScale, x: calcTranslate("x"), y: calcTranslate("y") };
};

const ZoomAndPan = ({ src, speed = 0.1 }) => {
  const [transition, setTransition] = useTransition();

  const [size, setSize] = useState({});
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const onWheel = (event) => {
    const wrapper = wrapperRef.current;

    const deltaScale = -speed * Math.max(-1, Math.min(1, event.deltaY));

    if (transition.scale <= speed && deltaScale < 0) return;

    const pointer = getPointerPosition(event, wrapper);

    setTransition(
      calcTransition(
        pointer,
        { x: transition.x, y: transition.y },
        transition.scale,
        deltaScale
      )
    );
  };

  const onMouseMove = (event) => {
    event.stopPropagation();
    if (event.buttons !== 2) return;
    const { movementX, movementY } = event;
    setTransition({ x: movementX + transition.x, y: movementY + transition.y });
  };

  useEffect(() => {
    const image = imageRef.current;
    image.onload = function () {
      setSize({
        width: this.naturalWidth,
        height: this.naturalHeight,
      });
    };
  }, []);

  return (
    <div className="container">
      <div
        className="image_wrapper"
        ref={wrapperRef}
        style={{
          aspectRatio: size.height ? size.width / size.height : "auto",
          scale: String(transition.scale),
          translate: stringifyTranslate(transition.x, transition.y),
        }}
        onWheel={onWheel}
        onMouseMove={onMouseMove}
      >
        <img
          ref={imageRef}
          src={src}
          onContextMenu={(e) => e.preventDefault()}
        />
        <canvas
          ref={canvasRef}
          {...size}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
};

ZoomAndPan.propTypes = {
  src: PropTypes.string.isRequired,
  speed: PropTypes.number,
};

export default ZoomAndPan;
