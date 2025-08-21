import { ACTIONS } from "./constants";

export const incrmentAction = () => ({ type: ACTIONS.INCREMENT });
export const decrmentAction = () => ({ type: ACTIONS.DECREMENT });
export const resetAction = () => ({ type: ACTIONS.RESET });
export const addNumAction = a => ({ type: ACTIONS.ADDNUM, payload: a });
