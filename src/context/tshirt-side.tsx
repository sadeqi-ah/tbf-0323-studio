"use client";

import { SideType } from "@/components/tshirt-side";
import { Color, colors } from "@/config";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

const TShirtSideContext = createContext<SideType | undefined>(undefined);
const TShirtSideDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<SideType>> | undefined
>(undefined);

export function TShirtSideProvider({ children }: PropsWithChildren) {
  const [selectedColor, setSelectedColor] = useState<SideType>("front");

  return (
    <TShirtSideDispatchContext.Provider value={setSelectedColor}>
      <TShirtSideContext.Provider value={selectedColor}>
        {children}
      </TShirtSideContext.Provider>
    </TShirtSideDispatchContext.Provider>
  );
}

export function useTShirtSide() {
  const value = useContext(TShirtSideContext);

  if (value === undefined)
    throw Error(
      "'useTShirtSide' must be used within a TShirtSideProvider"
    );

  return value;
}

export function useDispatchTShirtSide() {
  const dispatch = useContext(TShirtSideDispatchContext);

  if (dispatch === undefined)
    throw Error(
      "'useDispatchTShirtSide' must be used within a TShirtSideProvider"
    );

  return dispatch;
}
