import { createContext } from "react"

type ActiveKeyProps = {
    mode: "horizontal" | "vertical" | "inline"
    selectKey: string | null,
    hoverKey: string | null,
    keyMap: Map<string, string[]>,
    setSelectKey: (key: string) => void,
    setHoverKey: (key: string | null) => void,
    childRelationMap:Map<string,Set<string>>,
    amountMap:Map<string,number>
}
const ActiveKeyContext = createContext<ActiveKeyProps>({
    mode: "horizontal",
    selectKey: null,
    hoverKey: null,
    keyMap: new Map(),
    setSelectKey: () => { },
    setHoverKey: () => { },
    childRelationMap:new Map(),
    amountMap:new Map()
})
export default ActiveKeyContext
