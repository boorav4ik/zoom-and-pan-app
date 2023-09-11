import { useContext } from 'react'
import TransitionContext from './context'

export { default as TransitionProvider } from './provider'

export const useTransition = () => useContext(TransitionContext)
