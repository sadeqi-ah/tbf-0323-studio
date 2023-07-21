import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSelectedColor } from "@/context/selected-color";
import { useTShirtSide } from "@/context/tshirt-side";

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
  const selectedColor = useSelectedColor();
  const side = useTShirtSide();

  useFrame((state, delta) => {
    easing.dampC(
      materials.tshirt_material.color,
      selectedColor.tshirt,
      0.1,
      delta
    );

    if (side === "front") {
      easing.dampE(modelRef.current!.rotation, [0, 0, 0], 0.1, delta);
    } else if (side === "back") {
      easing.dampE(modelRef.current!.rotation, [0, Math.PI, 0], 0.1, delta);
    } else if (side === "left") {
      easing.dampE(modelRef.current!.rotation, [0, Math.PI / 2, 0], 0.1, delta);
    } else if (side === "right") {
      easing.dampE(
        modelRef.current!.rotation,
        [0, -Math.PI / 2, 0],
        0.25,
        delta
      );
    }

    // modelRef.current!.rotation;
    // modelRef.current!.rotation.y = -Math.PI / 2;
  });

  return (
    <group
      {...props}
      ref={modelRef}
      rotation={[0, -Math.PI / 2, 0]}
      dispose={null}
    >
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
