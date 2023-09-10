import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import stringifyTranslate from "../../functions/stringifyTranslate";
import { useTransition } from "../../contexts/transition";
import "./index.css";

const getPointerPosition = (
  { pageX, pageY },
  { offsetLeft, offsetTop, clientWidth, clientHeight }
) => ({
  x: -0.5 + (pageX - offsetLeft) / clientWidth,
  y: -0.5 + (pageY - offsetTop) / clientHeight,
});

const calcTransition = (position, translate, scale, deltaScale) => {
  const newScale = scale + deltaScale;
  const calcTranslate = (coordinate) =>
    position[coordinate] -
    ((position[coordinate] - translate[coordinate]) * newScale) / scale;

  return { scale: newScale, x: calcTranslate("x"), y: calcTranslate("y") };
};

const ZoomAndPan = ({ src, speed = 0.1 }) => {
  const [{ scale, ...transition }, setTransition] = useTransition();

  const [size, setSize] = useState({});
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const onWheel = (event) => {
    const wrapper = wrapperRef.current;

    const deltaScale = -speed * Math.max(-1, Math.min(1, event.deltaY));

    if (scale <= speed && deltaScale < 0) return;

    setTransition(
      calcTransition(
        getPointerPosition(event, wrapper),
        transition,
        scale,
        deltaScale
      )
    );
  };

  const onMouseMove = (event) => {
    event.stopPropagation();
    if (event.buttons !== 2) return;
    const { movementX, movementY } = event;
    const wrapper = wrapperRef.current;

    setTransition({
      x: movementX / wrapper.clientWidth + transition.x,
      y: movementY / wrapper.clientHeight + transition.y,
    });
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
          scale: String(scale),
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
