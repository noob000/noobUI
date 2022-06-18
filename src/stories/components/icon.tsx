interface svgObj {
    viewBox: string;
    version: string;
    xmlns: string;
    "p-id": string;
    width: string;
    height: string;
}
interface pathObj {
    d: string; fill: string; "p-id": string;
}
interface iconObj {
    svg: svgObj
    path: pathObj[]
}
type svgObjKey = keyof svgObj;
type pathObjKey = keyof pathObj;
export type { iconObj, svgObjKey, pathObjKey }