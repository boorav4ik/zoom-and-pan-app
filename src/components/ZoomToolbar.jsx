import { useTransition } from '../contexts/transition'
import Toolbar from './Toolbar'

const SCALE_OPTIONS = [0.5, 1, 1.5, 2, 3, 10]

const ZoomTools = () => {
  const [{ scale }, setTransition, resetTransition] = useTransition()
  return (
    <Toolbar>
      <select
        name="scale"
        value={scale}
        onChange={({ target: { value } }) =>
          setTransition({ scale: Number(value) })
        }
      >
        {!(scale in SCALE_OPTIONS) && (
          <option key="custom" value={0}>
            {`${Math.round(scale * 100)}%`}
          </option>
        )}

        {SCALE_OPTIONS.map((option) => (
          <option key={option} value={option}>{`${option * 100}%`}</option>
        ))}
      </select>
      <button onClick={resetTransition}>reset</button>
    </Toolbar>
  )
}

export default ZoomTools
