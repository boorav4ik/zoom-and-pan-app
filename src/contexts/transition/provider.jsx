import { useReducer } from 'react'
import ChildrenPropType from '../../types/children'
import TransitionContext, { initState } from './context'

const RESET = 'reset'
const CHANGE = 'change'

function reducer(state, action) {
  switch (action.type) {
    case RESET:
      return initState
    case CHANGE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const TransitionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <TransitionContext.Provider
      value={[
        state,
        (payload) => dispatch({ type: CHANGE, payload }),
        () => dispatch({ type: RESET }),
      ]}
    >
      {children}
    </TransitionContext.Provider>
  )
}

TransitionContextProvider.propTypes = {
  children: ChildrenPropType.isRequired,
}

export default TransitionContextProvider
