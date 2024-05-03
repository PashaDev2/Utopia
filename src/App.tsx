import "./App.css";
import { Canvas, useThree } from "@react-three/fiber";
import { Star } from "./Star";
import styles from "./App.module.scss";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Environment } from "@react-three/drei";
import { useEffect } from "react";

function App() {
    return (
        <>
            <Canvas className={styles.canvas}>
                <ambientLight intensity={Math.PI / 2} />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls />
                <Star position={[0, 0, 0]} />
                <BgPlane />
                {/* <Environment preset="lobby" /> */}
            </Canvas>
        </>
    );
}

const BgPlane = () => {
    const texture = useTexture("/1.png");
    const envTexture = useTexture("/2.jpg");
    envTexture.mapping = THREE.EquirectangularReflectionMapping;

    const scene = useThree(({ gl, scene }) => {
        gl.setClearColor(new THREE.Color("#d6d6d6"));
        return scene;
    });

    useEffect(() => {
        if (scene) {
            scene.background = new THREE.Color("#d6d6d6");
            scene.environment = envTexture;
        }
    }, [envTexture]);

    return (
        <mesh position={[0, 0, -0.3]}>
            <planeGeometry args={[3.5, 3.5]} />
            <meshStandardMaterial
                side={THREE.DoubleSide}
                emissiveIntensity={1}
                emissiveMap={texture}
                map={texture}
                transparent
            />
        </mesh>
    );
};

export default App;
