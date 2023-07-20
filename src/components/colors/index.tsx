import React from "react";
import styles from "@/styles/Colors.module.css";
import ColorOption from "./ColorOption";

type ColorsProps = {
  colors: string[];
};

function Colors({ colors }: ColorsProps) {
  return (
    <div className={styles.Colors}>
      {colors.map((color) => (
        <ColorOption key={color} color={color} />
      ))}
    </div>
  );
}

export default Colors;
