import * as THREE from "three";
import { MeshTransmissionMaterial, useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useLoader, useThree } from "@react-three/fiber";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/three";

type GLTFResult = GLTF & {
    nodes: {
        Scene: THREE.Group;
        group897219909002: THREE.Group;
    };
};

export function Hero(props: JSX.IntrinsicElements["group"] & { texture: THREE.Texture }) {
    const gltf = useLoader(GLTFLoader, "/hero.glb", loader => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("./draco/");
        loader.setDRACOLoader(dracoLoader);
    }) as GLTFResult;
    const { nodes } = gltf;
    const envTexture = useTexture("/2.jpg");
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    const [mtmRef, setMtmRef] = useState<THREE.MeshPhysicalMaterial | null>(null);
    const isOver = useRef(false);
    const { width, height } = useThree(state => state.size);

    useEffect(() => {
        if (nodes.Scene && mtmRef) {
            nodes.Scene.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    child.material = mtmRef;
                }
            });
        }
    }, [mtmRef, nodes]);

    const [springs, api] = useSpring(
        () => ({
            scale: 1,
            position: [0, 0],
            rotation: [0, Math.PI / 2, 0],
            config: key => {
                switch (key) {
                    case "scale":
                        return {
                            mass: 4,
                            friction: 10,
                        };
                    case "position":
                        return { mass: 4, friction: 220 };
                    default:
                        return {};
                }
            },
        }),
        []
    );

    const handlePointerEnter = () => {
        api.start({
            scale: 1.5,
        });
    };

    const handlePointerLeave = () => {
        api.start({
            scale: 1,
        });
    };

    const handlePointerMove = useCallback(
        e => {
            if (isOver.current) {
                const x = (e.offsetX / width) * 2 - 1;
                const y = (e.offsetY / height) * -2 + 1;

                api.start({
                    position: [x * 5, y * 2],
                });
            }
        },
        [api, width, height]
    );

    const handleClick = useCallback(() => {
        let clicked = false;

        return () => {
            clicked = !clicked;
            api.start({
                rotation: clicked ? [0, Math.PI / 2, Math.PI] : [0, -Math.PI / 2, 0],
                config: {
                    mass: 4,
                    friction: 220,
                },
            });
        };
    }, []);

    return (
        <>
            <mesh
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                onPointerMove={handlePointerMove}
                {...(props as unknown as JSX.IntrinsicElements["mesh"])}
                onClick={handleClick()}>
                <planeGeometry args={[2, 2]} />
                <meshBasicMaterial visible={false} />
            </mesh>

            <animated.group
                {...props}
                scale={springs.scale}
                rotation={springs.rotation as unknown as THREE.Euler}
                dispose={null}>
                <primitive object={nodes.Scene} />
                <MeshTransmissionMaterial
                    ref={ref => setMtmRef(ref as THREE.MeshPhysicalMaterial)}
                    roughness={0.05}
                    metalness={0}
                    samples={10}
                    transmissionSampler={false}
                    backside={false}
                    resolution={2048}
                    transmission={1}
                    thickness={0.5}
                    ior={2.1}
                    opacity={0.9}
                    transparent
                    chromaticAberration={0.05}
                    anisotropy={1}
                    distortion={1}
                    distortionScale={0.3}
                    temporalDistortion={0.05}
                    clearcoat={1}
                    attenuationDistance={0.5}
                    envMapIntensity={1}
                    background={props.texture}
                />
            </animated.group>
        </>
    );
}

useGLTF.preload("/hero.glb");
