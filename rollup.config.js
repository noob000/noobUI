import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-porter"
export default [{
    input: "src/stories/components/button/Button.tsx",
    output: {
        file: "lib/button/button.js",
        format: "cjs"
    },
    plugins: [typescript(), css()]
},
{
    input: "src/stories/components/header/Header.tsx",
    output: {
        file: "lib/header/header.js",
        format: "cjs"
    },
    plugins: [typescript(), css()]
}]