"use client";

import { createContext, useContext } from "react";

export const RevealContext = createContext(true);

export function useReveal() {
  return useContext(RevealContext);
}
