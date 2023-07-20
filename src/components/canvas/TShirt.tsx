import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSelectedColor } from "@/context/selected-color";

type GLTFResult = GLTF & {
  nodes: {
    tshirt: THREE.Mesh;
  };
  materials: {
    tshirt_material: THREE.MeshStandardMaterial;
  };
};

type TShirtProps = JSX.IntrinsicElements["group"];

function TShirt(props: TShirtProps) {
  const { nodes, materials } = useGLTF("/tshirt.glb") as GLTFResult;
  const modelRef = useRef<THREE.Group>(null);
  const color = useSelectedColor()

  useFrame((state, delta) => {
    easing.dampC(materials.tshirt_material.color, color, 0.1, delta);
    // modelRef.current!.rotation.y += 0.01;
  });

  return (
    <group {...props} ref={modelRef} dispose={null}>
      <mesh
        castShadow
        geometry={nodes.tshirt.geometry}
        material={materials.tshirt_material}
      >
        <spotLight
          castShadow
          intensity={0.5}
          position={[10, 10, -10]}
          angle={0.15}
          penumbra={1}
          shadow-normalBias={0.05}
          shadow-bias={0.0001}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/tshirt.glb");

export default TShirt;
