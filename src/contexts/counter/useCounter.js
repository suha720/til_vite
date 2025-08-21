import { useContext } from "react";
import { CounterContext } from "./context";

export function useCounter() {
  const ctx = useContext(CounterContext);
  if (!ctx) {
    throw new Error("에러입니다.");
  }
  return ctx;
}
