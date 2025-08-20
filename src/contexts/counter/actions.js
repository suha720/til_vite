import { ACTIONS } from "./constants";

export const incrementAction = () => ({ type: ACTIONS.INCREMENT });
export const decrementAction = () => ({ type: ACTIONS.DECREMENT });
export const resetAction = () => ({ type: ACTIONS.RESET });
export const addnumAction = num => ({ type: ACTIONS.ADDNUM, payload: num });
