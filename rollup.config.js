import typescript from "rollup-plugin-typescript2";
import css from "rollup-plugin-css-porter";
import dts from 'rollup-plugin-dts';
import babel from "@rollup/plugin-babel";
import scss from "rollup-plugin-scss";

const babelOptions = {
    presets: ["@babel/preset-env"],
    extensions: ['.js', '.jsx', '.ts', '.tsx',],
    exclude: "**/node_modules/**",
}
const commonPlugins = [
    typescript(),
    css(),
    babel(babelOptions),
    scss({ output: "lib/index.css" }),
]
const button = [
    {
        input: "src/stories/components/button/Button.tsx",
        output: {
            file: "lib/es/button/index.js",
            format: "esm"
        },
        plugins: commonPlugins
    },
    {
        input: "src/stories/components/button/Button.tsx",
        output: {
            file: "lib/es/button/index.d.ts",
        },
        external: [/\.scss$/],
        plugins: [dts()]
    },
]
const message = [
    {
        input: "src/stories/components/message/message.tsx",
        output: [{
            file: "lib/es/message/index.js",
            format: "esm"
        }],
        plugins: commonPlugins
    },
    {
        input: "src/stories/components/message/message.tsx",
        output: [{
            file: "lib/es/message/index.d.ts",
        }],
        external: [/\.scss$/],
        plugins: [dts()]
    },
]

const carousel = [
    {
        input: "src/stories/components/Carousel/carousel.tsx",
        output: [{
            file: "lib/es/carousel/index.js",
            format: "esm"
        }],
        plugins: commonPlugins
    },
    {
        input: "src/stories/components/Carousel/carousel.tsx",
        output: [{
            file: "lib/es/carousel/index.d.ts",
        }],
        external: [/\.scss$/],
        plugins: [dts()]
    },
]
export default [
    ...button,
    ...message,
    ...carousel,
    {
        input: "src/stories/components/index.ts",
        output: {
            file: "lib/types/index.d.ts",
        },
        external: [/\.scss$/],
        plugins: [dts()]
    },
]