import * as THREE from "three";
import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import {
  Points,
  PointMaterial,
  PerspectiveCamera,
  OrbitControls,
  Text,
} from "@react-three/drei";
import * as random from "maath/random";
import { useTheme } from "@mui/styles";
import { Mesh } from "three";
import { Cylinder } from "./splines/cylinder";
import GltfModel from "./Logo";
import LogoAnime from "@/components/svg/logoAnime.svg";
function Box(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const theme = useTheme();
  useFrame((state, delta) => (meshRef.current.rotation.x += delta));
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function TextAnimation(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const theme = useTheme();
  useFrame((state, delta) => (meshRef.current.rotation.y += delta));
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      {/* <boxGeometry args={[1, 1, 1]} /> */}
      <OrbitControls />
      <Text
        font={
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        }
        fontSize={10}
      >
        T
        <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      </Text>
    </mesh>
  );
}

function Stars(props) {
  const ref = useRef();
  const theme = useTheme();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.5 })
  );
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color={theme.palette.secondary.main}
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const Cube = () => {
  const meshRef = useRef<Mesh>(null);
  useFrame(() => {
    if (!meshRef.current) {
      return;
    }
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="purple" />
    </mesh>
  );
};

export default function Logo3D() {
  // return (
  //   <Canvas>
  //     <GltfModel
  //       modelPath={"/assets/logo_model.glb"}
  //       scale={1}
  //       position={[0, 20, 0]}
  //     />
  //     <PerspectiveCamera makeDefault fov={75} position={[0, 0, 5]} />
  //     <ambientLight />
  //     <pointLight position={[1, 1, 1]} />
  //     {/* { <ambientLight />
  //     <pointLight position={[10, 10, 10]} />
  //     <Box position={[-1.2, 0, 0]} />
  //     <Box position={[1.2, 0, 0]} />} */}
  //     <Box position={[-1.2, 0, 0]} />
  //     <Box position={[1.2, 2, 0]} />
  //     <Box position={[1.2, 2, 0]} />
  //     <Box position={[1.2, 2, 0]} />
  //     <Box position={[1.2, 2, 0]} />
  //     {/* <Stars /> */}
  //     {/* <Cube /> */}
  //     <TextAnimation />
  //     <Cylinder y={5} />
  //   </Canvas>
  // );
  return (
    <div style={{ position: "absolute", top: "0" }}>
      <LogoAnime />
      <Canvas>
        <PerspectiveCamera makeDefault fov={10} position={[0, 0, 5]} />
        <ambientLight />
        <TextAnimation position={[1.2, 2, 0]} />
      </Canvas>
    </div>
  );
}
