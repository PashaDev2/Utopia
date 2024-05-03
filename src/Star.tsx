import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, MeshTransmissionMaterial } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame, useLoader } from "@react-three/fiber";
import { useControls } from "leva";

type GLTFResult = GLTF & {
    nodes: {
        Utopia_Star: THREE.SkinnedMesh;
        Bone: THREE.Bone;
        Bone001: THREE.Bone;
        Bone002: THREE.Bone;
        Bone003: THREE.Bone;
        Bone004: THREE.Bone;
        Bone005: THREE.Bone;
        Bone006: THREE.Bone;
        Bone007: THREE.Bone;
    };
    materials: {};
    animations: GLTFAction[];
};

type ActionName = "Star1";
interface GLTFAction extends THREE.AnimationClip {
    name: ActionName;
}
type ContextType = Record<
    string,
    React.ForwardRefExoticComponent<
        JSX.IntrinsicElements["skinnedMesh"] | JSX.IntrinsicElements["bone"]
    >
>;

export function Star(props: JSX.IntrinsicElements["group"]) {
    const group = useRef<THREE.Group>();
    const { nodes, animations } = useLoader(GLTFLoader, "/Star.glb", loader => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("./draco/");
        loader.setDRACOLoader(dracoLoader);
    });
    const { actions } = useAnimations(animations, group);

    const controls = useControls({
        roughness: { value: 0.2, min: 0, max: 1, step: 0.01 },
        metalness: { value: 1, min: 0, max: 1, step: 0.01 },
        samples: { value: 10, min: 1, max: 32, step: 1 },
        meshPhysicalMaterial: false,
        transmissionSampler: false,
        backside: false,
        resolution: { value: 2048, min: 256, max: 2048, step: 256 },
        transmission: { value: 1, min: 0, max: 1 },
        thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
        ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
        chromaticAberration: { value: 0.06, min: 0, max: 1 },
        anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
        distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
        distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
        temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
        clearcoat: { value: 1, min: 0, max: 1 },
        attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
        attenuationColor: "#ffffff",
        color: "#c9ffa1",
        bg: "#839681",
    });

    useEffect(() => {
        if (actions.Star1) {
            actions.Star1.loop = THREE.LoopOnce;
            actions.Star1.clampWhenFinished = true;
            actions.Star1.play();
        }
    }, [nodes]);
    const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
    useFrame(() => {
        if (materialRef.current) {
            materialRef.current.needsUpdate = true;
        }
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <group name="Armature">
                    <primitive object={nodes.Bone} />
                    <primitive object={nodes.Bone001} />
                    <primitive object={nodes.Bone002} />
                    <primitive object={nodes.Bone003} />
                    <primitive object={nodes.Bone004} />
                    <primitive object={nodes.Bone005} />
                    <primitive object={nodes.Bone006} />
                    <primitive object={nodes.Bone007} />
                </group>
                <skinnedMesh
                    name="Utopia_Star"
                    geometry={nodes.Utopia_Star.geometry}
                    skeleton={nodes.Utopia_Star.skeleton}>
                    <MeshTransmissionMaterial
                        ref={materialRef}
                        roughness={controls.roughness}
                        metalness={controls.metalness}
                        samples={controls.samples}
                        transmissionSampler={controls.transmissionSampler}
                        backside={controls.backside}
                        resolution={controls.resolution}
                        transmission={controls.transmission}
                        thickness={controls.thickness}
                        ior={controls.ior}
                        chromaticAberration={controls.chromaticAberration}
                        anisotropy={controls.anisotropy}
                        distortion={controls.distortion}
                        distortionScale={controls.distortionScale}
                        temporalDistortion={controls.temporalDistortion}
                        clearcoat={controls.clearcoat}
                        attenuationDistance={controls.attenuationDistance}
                        attenuationColor={controls.attenuationColor}
                        color={controls.color}
                        background={new THREE.Color(controls.bg)}
                    />
                </skinnedMesh>
            </group>
        </group>
    );
}

useGLTF.preload("/Star-transformed.glb");