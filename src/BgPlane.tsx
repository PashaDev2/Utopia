import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";

export const BgPlane = (props: JSX.IntrinsicElements["mesh"]) => {
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
        <mesh {...props}>
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
