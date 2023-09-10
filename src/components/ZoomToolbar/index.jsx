import { useTransition } from "../../contexts/transition";

const SCALE_OPTIONS = [0.5, 1, 1.5, 2, 3];

const ZoomTools = () => {
  const [{ scale }, setTransition, resetTransition] = useTransition();
  return (
    <div className="zoom-toolbar">
      <label></label>
      <select
        name="scale"
        value={scale}
        onChange={({ target: { value } }) =>
          setTransition({ scale: Number(value) })
        }
      >
        {SCALE_OPTIONS.map((option) => (
          <option key={option} value={option}>{`${option * 100}%`}</option>
        ))}
      </select>
      <button onClick={resetTransition}>reset</button>
    </div>
  );
};

export default ZoomTools;
