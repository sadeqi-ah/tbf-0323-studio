"use client";

import React, { useRef } from "react";
import styles from "@/styles/TShirtSide.module.css";
import Front from "@/icons/tshirt-front.svg";
import Back from "@/icons/tshirt-back.svg";
import Left from "@/icons/tshirt-left.svg";
import Right from "@/icons/tshirt-right.svg";
import { useSelectedColor } from "@/context/selected-color";
import { useDispatchTShirtSide, useTShirtSide } from "@/context/tshirt-side";

const sides = ["front", "back", "left", "right"] as const;
export type SideType = (typeof sides)[number];

function renderIconBySide(side: SideType) {
  switch (side) {
    case "front":
      return <Front />;
    case "back":
      return <Back />;
    case "left":
      return <Left />;
    case "right":
      return <Right />;
  }
}

function TShirtSide() {
  const selectedColor = useSelectedColor();
  const active = useTShirtSide();
  const dispatch = useDispatchTShirtSide();
  const highlightRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>(Array.from({ length: 4 }));

  const getActiveElement = () => {
    if (itemsRef.current) {
      return [...itemsRef.current].find(
        (item) => item?.dataset.active === "true"
      );
    }
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLDivElement;
    const containerLeft = containerRef.current!.getBoundingClientRect().left;
    const left = target.getBoundingClientRect().left;
    highlightRef.current!.style.transform = `translateX(${
      left - containerLeft - 3
    }px)`;
  };

  const handleMouseLeave = () => {
    const activeElement = getActiveElement();
    if (activeElement) {
      const containerLeft = containerRef.current!.getBoundingClientRect().left;
      const left = activeElement.getBoundingClientRect().left;
      highlightRef.current!.style.transform = `translateX(${
        left - containerLeft - 3
      }px)`;
    }
  };

  return (
    <div className={styles.TShirtSide}>
      <div
        className={styles.TShirtSide__container}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
      >
        <span
          className={styles.highlight}
          ref={highlightRef}
          style={{
            backgroundColor: selectedColor.primary,
          }}
        />
        {sides.map((side, i) => (
          <div
            key={side}
            ref={(ref) => (itemsRef.current[i] = ref)}
            onClick={() => dispatch(side)}
            data-active={side === active}
            onMouseEnter={handleMouseEnter}
            style={{
              color: active === side ? selectedColor.primary : undefined,
            }}
          >
            <i>{renderIconBySide(side)}</i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TShirtSide;
