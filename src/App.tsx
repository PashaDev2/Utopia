import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import styles from "./App.module.scss";
import { CubeCamera, PerspectiveCamera, Stars } from "@react-three/drei";
import { BgPlane } from "./BgPlane";
import { Effects } from "./Effects";
import * as THREE from "three";
import { Hero } from "./Hero";

function App() {
    return (
        <>
            <Canvas
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    powerPreference: "high-performance",
                }}
                className={styles.canvas}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={Math.PI / 2} color={new THREE.Color("blue")} />
                <pointLight
                    position={[10, 10, 10]}
                    intensity={20}
                    color={new THREE.Color("blue")}
                />
                <CameraControls />

                <CubeCamera>
                    {texture => (
                        <>
                            <Hero position={[0, 0, 1]} texture={texture} />
                            <BgPlane position={[0, 0, 0.7]} texture={texture} />
                        </>
                    )}
                </CubeCamera>

                <Effects />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
            </Canvas>
        </>
    );
}

const CameraControls = () => {
    useFrame(({ camera, pointer }) => {
        // rotate camera based on mouse position with lerping
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, -pointer.x * 1.5, 0.1);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, -pointer.y * 1.5, 0.1);
        camera.lookAt(0, 0, 0);
    });
    return <></>;
};

export default App;
