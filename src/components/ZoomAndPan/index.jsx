import { useRef } from "react";
import PropTypes from "prop-types";
import parseTranslate from "../../functions/parseTranslate";
import stringifyTranslate from "../../functions/stringifyTranslate";
import "./index.css";

function calcTranslate(position, target, scale) {
  return position - target * scale;
}

function getMousePosition({ pageX, pageY }, { offsetLeft, offsetTop }) {
  return { x: pageX - offsetLeft, y: pageY - offsetTop };
}

const ZoomAndPan = ({ src, speed = 0.1 }) => {
  const containerRef = useRef(null);

  const onWheel = (event) => {
    event.stopPropagation();
    if (event.buttons === 2) return;
    const container = containerRef.current;
    const { style } = container;
    const { deltaY } = event;
    const scale = Number(style.scale || 1);
    const translate = parseTranslate(style.translate);
    const point = getMousePosition(event, container);

    const target = {
      x: (point.x - translate.x) / scale,
      y: (point.y - translate.y) / scale,
    };
    const newScale =
      scale - 1 * Math.max(-1, Math.min(1, deltaY)) * speed * scale;

    style.scale = newScale;
    style.translate = stringifyTranslate(
      calcTranslate(point.x, target.x, newScale),
      calcTranslate(point.y, target.y, newScale)
    );
  };

  const onMouseMove = (event) => {
    event.stopPropagation();
    if (event.buttons === 2) {
      const container = containerRef.current;
      const { style } = container;
      const { movementX, movementY } = event;
      const translate = parseTranslate(style.translate);

      style.translate = stringifyTranslate(
        movementX + translate.x,
        movementY + translate.y
      );
    }
  };

  return (
    <div
      className="zoom_container"
      ref={containerRef}
      onWheel={onWheel}
      onMouseMove={onMouseMove}
      onContextMenu={(e) => e.preventDefault()}
    >
      <img src={src} />
    </div>
  );
};

ZoomAndPan.propTypes = {
  src: PropTypes.string.isRequired,
  speed: PropTypes.number,
};

export default ZoomAndPan;
