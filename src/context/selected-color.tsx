"use client";

import { Color, colors } from "@/config";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

const SelectedColorContext = createContext<Color | undefined>(undefined);
const SelectedColorDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<Color>> | undefined
>(undefined);

type SelectedColorProviderProps = PropsWithChildren<{ defaultColor?: Color }>;

export function SelectedColorProvider({
  children,
  defaultColor,
}: SelectedColorProviderProps) {
  const [selectedColor, setSelectedColor] = useState(defaultColor || colors[0]);

  return (
    <SelectedColorDispatchContext.Provider value={setSelectedColor}>
      <SelectedColorContext.Provider value={selectedColor}>
        {children}
      </SelectedColorContext.Provider>
    </SelectedColorDispatchContext.Provider>
  );
}

export function useSelectedColor() {
  const value = useContext(SelectedColorContext);

  if (value === undefined)
    throw Error(
      "'useSelectedColor' must be used within a SelectedColorProvider"
    );

  return value;
}

export function useDispatchSelectedColor() {
  const dispatch = useContext(SelectedColorDispatchContext);

  if (dispatch === undefined)
    throw Error(
      "'useDispatchSelectedColor' must be used within a SelectedColorProvider"
    );

  return dispatch;
}
