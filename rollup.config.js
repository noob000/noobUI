import typescript from "rollup-plugin-typescript2";
import css from "rollup-plugin-css-porter";
import dts from 'rollup-plugin-dts';
import babel from "@rollup/plugin-babel";


const babelOptions = {
    presets: ["@babel/preset-env"],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
    exclude: "**/node_modules/**"
}
const commonPlugins = [
    typescript(),
    css(),
    babel(babelOptions)
]
export default [
    {
        input: "src/stories/components/index.ts",
        output: {
            file: "lib/es/index.js",
            format: "esm"
        },
        plugins: commonPlugins
    },
    {
        input: "src/stories/components/index.ts",
        output: {
            file: "lib/cjs/index.js",
            format: "cjs"
        },
        plugins: commonPlugins
    },
    {
        input: "src/stories/components/index.d.ts",
        output: {
            file: "lib/types/index.d.ts",
            format: 'es'
        },
        plugins: [...commonPlugins, dts()]
    }

]