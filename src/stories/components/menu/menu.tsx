import { FC, useEffect, useState } from "react";
import ActiveKeyContext from "./hooks/ActiveKeyContext";
import { testItem } from "./menu.test";
import MenuItem from "./menuItem";
import "./style/menu.scss"
type MenuProps = {
    items?: MenuItemProps[];
    mode?: "vertical" | "horizontal";
    selectedKey?: string | null;
};
type clickFnProps = {
    selectKey: string | null,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
}

type clickFn = (props: clickFnProps) => any

type MenuItemProps = {
    label: string;
    key: string;
    children?: MenuItemProps[];
    onClick?: clickFn
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


const Menu: FC<MenuProps> = ({ items = testItem, selectedKey = null }) => {
    const [keyMap, setKeyMap] = useState<Map<string, string[]>>(new Map());
    const [selectKey, setSelectKey] = useState<string | null>(null);
    const [hoverKey, setHoverKey] = useState<string | null>(null);
    useEffect(() => {
        let map = new Map();
        items.forEach((item) => {
            handleMenuItem(item, [], map)
        })
        setKeyMap(map)
    }, [items])
    useEffect(() => {
        if (keyMap.size > 0 && selectKey !== null) {
            let temp = false;
            for (let i of keyMap.keys()) {
                if (i === selectKey) {
                    temp = true;
                    break;
                }
            }
            if (!temp) throw new Error("wrong selectedKey props")
        }
    }, [keyMap, selectedKey])
    useEffect(() => {
        console.log(selectKey)
    }, [selectKey])
    return (

        <div className='menuContainer'>
            <ActiveKeyContext.Provider value={{
                selectKey,
                hoverKey: hoverKey,
                keyMap: keyMap,
                setHoverKey: (key: string | null) => { setHoverKey(key) },
                setSelectKey: (key: string) => { setSelectKey(key) }
            }}>
                {items.map((item) => <MenuItem
                    item={item}
                    key={item.key} />)}
            </ActiveKeyContext.Provider>
        </div>
    )
}

export default Menu
export type { MenuProps, MenuItemProps }
export { ActiveKeyContext }