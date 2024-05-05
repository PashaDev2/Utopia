import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, useVideoTexture } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export const BgPlane = (props: JSX.IntrinsicElements["mesh"] & { texture: THREE.Texture }) => {
    const texture = useTexture("/1.png");
    const envTexture = useTexture("/2.jpg");
    const videoTexture = useVideoTexture("/gif.mp4");
    const ref = useRef<THREE.MeshStandardMaterial>();

    const scene = useThree(({ gl, scene }) => {
        gl.setClearColor(new THREE.Color("#d6d6d6"));
        return scene;
    });

    useEffect(() => {
        if (scene && envTexture) {
            videoTexture.needsUpdate = true;
            scene.background = videoTexture;
            scene.environment = envTexture;
        }
    }, [scene]);

    useFrame(() => {
        if (ref.current) {
            ref.current.needsUpdate = true;
            ref.current.emissiveIntensity = 1;
            ref.current.map.needsUpdate = true;
        }
        if (envTexture) envTexture.needsUpdate = true;
    });

    return (
        <mesh {...props}>
            <planeGeometry args={[3.5, 3.5]} />
            <meshStandardMaterial
                ref={ref}
                side={THREE.DoubleSide}
                emissiveIntensity={1}
                emissiveMap={texture}
                map={videoTexture}
                visible={false}
                transparent
            />
        </mesh>
    );
};
