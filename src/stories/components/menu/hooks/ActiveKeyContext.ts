import { createContext } from "react"
import { MenuItemProps } from "../menu"

type ActiveKeyProps = {
    mode: "horizontal" | "vertical" | "inline"
    selectKey: string | null,
    hoverKey: string | null,
    keyMap: Map<string, string[]>,
    setSelectKey: (key: string) => void,
    setHoverKey: (key: string | null) => void,
    childKeysMap:Map<string,string[]>,
}
const ActiveKeyContext = createContext<ActiveKeyProps>({
    mode: "horizontal",
    selectKey: null,
    hoverKey: null,
    keyMap: new Map(),
    setSelectKey: () => { },
    setHoverKey: () => { },
    childKeysMap:new Map(),
})
export default ActiveKeyContext
