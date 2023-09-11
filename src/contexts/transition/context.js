import { createContext } from 'react'

export const initState = { scale: 1, x: 0, y: 0 }

export default createContext([initState, () => undefined, () => undefined])
