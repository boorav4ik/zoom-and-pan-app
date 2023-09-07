import React from "react";

export const initState = { scale: 1, x: 0, y: 0 };

const TransitionContext = React.createContext([initState, () => undefined, ()=>undefined]);

export default TransitionContext
