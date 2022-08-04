import { string } from "prop-types";
import { Children, createContext, FC, useContext, useEffect, useState } from "react";

import { testItem } from "./menu.test";
import MenuItem from "./menuItem";
import "./style/menu.scss"
type MenuProps = {
    items?: MenuItemProps[];
    mode?: "vertical" | "horizontal";

}
type MenuItemProps = {
    label: string;
    key: string;
    children?: MenuItemProps[];
}
type ActiveKeyProps = {
    selectKey: string,
    hoverKey: string | null,
    keyMap: Map<string, string[]>,
    setSelectKey: (key: string) => void,
    setHoverKey: (key: string|null) => void
}
function handleMenuItem(item: MenuItemProps, lastArr: string[], map: Map<string, string[]>) {
    const { key, children } = item
    let next = [...lastArr, key];
    map.set(key, next);
    if (children) {
        children.forEach((item) => {
            handleMenuItem(item, next, map)
        })
    }
}
const ActiveKeyContext = createContext<ActiveKeyProps>({
    selectKey: "",
    hoverKey: null,
    keyMap: new Map(),
    setSelectKey: () => { },
    setHoverKey: () => { }
})

const Menu: FC<MenuProps> = ({ items = testItem }) => {
    const [keyMap, setKeyMap] = useState<Map<string, string[]>>();
    const [selectKey, setSelectKey] = useState<string>("");
    const [hoverKey, setHoverKey] = useState<string | null>(null);
    useEffect(() => {
        let map = new Map();
        items.forEach((item) => {
            handleMenuItem(item, [], map)
        })
        setKeyMap(map)
    }, [items])
    return (

        <div className='menuContainer'>
            <ActiveKeyContext.Provider value={{
                selectKey,
                hoverKey: hoverKey,
                keyMap: keyMap ?? new Map(),
                setHoverKey: (key: string|null) => { setHoverKey(key) },
                setSelectKey: (key: string) => { setSelectKey(key) }
            }}>
                {items.map((item) => <MenuItem item={item} key={item.key}/>)}
            </ActiveKeyContext.Provider>
        </div>
    )
}
export default Menu
export type { MenuProps, MenuItemProps }
export { ActiveKeyContext }