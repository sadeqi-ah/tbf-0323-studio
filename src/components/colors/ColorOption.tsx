"use client";
import { Color } from "@/config";
import { useDispatchSelectedColor } from "@/context/selected-color";
import React from "react";

type ColorOptionProps = {
  color: Color;
};

function ColorOption({ color }: ColorOptionProps) {
  const dispatch = useDispatchSelectedColor();

  return (
    <div onClick={() => dispatch(color)} style={{ background: color.tshirt }} />
  );
}

export default ColorOption;
