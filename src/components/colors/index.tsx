import React from "react";
import styles from "@/styles/Colors.module.css";
import ColorOption from "./ColorOption";
import { Color } from "@/config";

type ColorsProps = {
  colors: Color[];
};

function Colors({ colors }: ColorsProps) {
  return (
    <div className={styles.Colors}>
      {colors.map((color) => (
        <ColorOption key={color.tshirt} color={color} />
      ))}
    </div>
  );
}

export default Colors;
