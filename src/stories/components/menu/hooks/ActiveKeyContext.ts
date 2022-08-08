import { createContext } from "react"

type ActiveKeyProps = {
    selectKey: string,
    hoverKey: string | null,
    keyMap: Map<string, string[]>,
    setSelectKey: (key: string) => void,
    setHoverKey: (key: string | null) => void
}
const ActiveKeyContext = createContext<ActiveKeyProps>({
    selectKey: "",
    hoverKey: null,
    keyMap: new Map(),
    setSelectKey: () => { },
    setHoverKey: () => { }
})
export default ActiveKeyContext
