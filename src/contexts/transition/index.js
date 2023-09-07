import React from "react";
import TransitionContext from "./context";

export { default as TransitionProvider } from "./provider";

export const useTransition = () => React.useContext(TransitionContext);
