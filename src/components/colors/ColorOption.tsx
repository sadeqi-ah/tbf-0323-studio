"use client";
import { useDispatchSelectedColor } from "@/context/selected-color";
import React from "react";

type ColorOptionProps = {
  color: string;
};

function ColorOption({ color }: ColorOptionProps) {
  const dispatch = useDispatchSelectedColor();

  return <div onClick={() => dispatch(color)} style={{ background: color }} />;
}

export default ColorOption;
