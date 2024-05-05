import { ToneMapping, Bloom, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useControls } from "leva";

export const Effects = () => {
    const toneMappingControls = useControls(
        "toneMapping",
        {
            blendFunction: {
                value: BlendFunction.REFLECT,
                // add enum type
                options: {
                    NORMAL: BlendFunction.NORMAL,
                    ADD: BlendFunction.ADD,
                    SUBTRACT: BlendFunction.SUBTRACT,
                    MULTIPLY: BlendFunction.MULTIPLY,
                    DIVIDE: BlendFunction.DIVIDE,
                    SCREEN: BlendFunction.SCREEN,
                    OVERLAY: BlendFunction.OVERLAY,
                    LINEAR_DODGE: BlendFunction.LINEAR_DODGE,
                    LINEAR_BURN: BlendFunction.LINEAR_BURN,
                    LINEAR_LIGHT: BlendFunction.LINEAR_LIGHT,
                    VIVID_LIGHT: BlendFunction.VIVID_LIGHT,
                    PIN_LIGHT: BlendFunction.PIN_LIGHT,
                    HARD_MIX: BlendFunction.HARD_MIX,
                    REFLECT: BlendFunction.REFLECT,
                    NEGATION: BlendFunction.NEGATION,
                    COLOR_DODGE: BlendFunction.COLOR_DODGE,
                    COLOR_BURN: BlendFunction.COLOR_BURN,
                },
            },
            adaptive: true,
            resolution: {
                value: 128,
                min: 64,
                max: 2048,
                step: 64,
            },
            middleGrey: {
                value: 0.6,
                min: 0,
                max: 1,
                step: 0.01,
            },
            maxLuminance: {
                value: 16,
                min: 1,
                max: 20,
                step: 0.1,
            },
            averageLuminance: {
                value: 0.5,
                min: 0,
                max: 10,
                step: 0.1,
            },
            adaptationRate: {
                value: 0.2,
                min: 0,
                max: 1,
                step: 0.1,
            },
            enabled: true,
        },
        {
            collapsed: true,
        }
    );
    const bloomControls = useControls(
        "bloom",
        {
            intensity: {
                value: 0.1,
                min: 0,
                max: 2,
                step: 0.1,
            },
            luminanceThreshold: {
                value: 0.5,
                min: 0,
                max: 1,
                step: 0.01,
            },
            luminanceSmoothing: {
                value: 0.5,
                min: 0,
                max: 1,
                step: 0.01,
            },
            height: {
                value: 480,
                min: 0,
                max: 1080,
                step: 10,
            },
            enabled: true,
        },
        {
            collapsed: true,
        }
    );

    if (!toneMappingControls.enabled && !bloomControls.enabled) return null;

    return (
        <EffectComposer>
            {toneMappingControls.enabled && (
                <ToneMapping
                    blendFunction={toneMappingControls.blendFunction}
                    adaptive={toneMappingControls.adaptive}
                    resolution={toneMappingControls.resolution}
                    middleGrey={toneMappingControls.middleGrey}
                    maxLuminance={toneMappingControls.maxLuminance}
                    averageLuminance={toneMappingControls.averageLuminance}
                    adaptationRate={toneMappingControls.adaptationRate}
                />
            )}

            {bloomControls.enabled && (
                <Bloom
                    intensity={bloomControls.intensity}
                    luminanceThreshold={bloomControls.luminanceThreshold}
                    luminanceSmoothing={bloomControls.luminanceSmoothing}
                    height={bloomControls.height}
                />
            )}
        </EffectComposer>
    );
};
