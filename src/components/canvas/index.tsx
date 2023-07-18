"use client";
import React, { PropsWithChildren, useRef } from "react";
import { Canvas as FiberCanvas, useFrame } from "@react-three/fiber";
import { Center, Environment } from "@react-three/drei";
import TShirt from "./TShirt";
import CameraRig from "./CameraRig";
import Backdrop from "./Backdrop";


function Canvas(props: PropsWithChildren) {
  return (
    <FiberCanvas
      shadows
      camera={{ position: [0, 0, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={0.1} />
      <Environment files="/potsdamer.hdr" />
      <directionalLight intensity={0.5} position={[0, 0, 2]} />

      <CameraRig>
        {/* <Backdrop /> */}
        <Center>
          <TShirt />
        </Center>
      </CameraRig>
      <gridHelper
        args={[50, 50, "#e9ecef", "#e9ecef"]}
        scale={0.09}
        position={[0, 0, -2]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </FiberCanvas>
  );
}

export default Canvas;
