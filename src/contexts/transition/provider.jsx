import React from "react";
import PropTypes from "prop-types";
import TransitionContext, { initState } from "./context";

const RESET = "reset";
const CHANGE = "change";

function reducer(state, action) {
  switch (action.type) {
    case RESET:
      return initState;
    case CHANGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const TransitionContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initState);

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
  );
};

TransitionContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};


export default TransitionContextProvider