import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { PropsWithChildren, useRef } from "react";
import { Group } from "three";

function CameraRig({ children }: PropsWithChildren) {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [0, 0, 2.5],
      0.25,
      delta
    );
    easing.dampE(
      group.current!.rotation,
      [state.pointer.y / 10, -state.pointer.x / 10, 0],
      0.25,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
}

export default CameraRig;
