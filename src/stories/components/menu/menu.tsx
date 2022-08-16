import { FC, useEffect, useState } from "react";
import ActiveKeyContext from "./hooks/ActiveKeyContext";
import InlineMenuItem from "./inlineMenuItem";
import { testItem } from "./menu.test";
import MenuItem from "./menuItem";
import "./style/menu.scss"
type MenuProps = {
    items?: MenuItemProps[];
    mode?: "vertical" | "horizontal" | "inline";
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


const Menu: FC<MenuProps> = ({ items = testItem, mode = 'inline', selectedKey = null }) => {
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
    return (

        <div className={`menuContainer-${mode}`}>
            <ActiveKeyContext.Provider value={{
                mode,
                selectKey,
                hoverKey: hoverKey,
                keyMap: keyMap,
                setHoverKey: (key: string | null) => { setHoverKey(key) },
                setSelectKey: (key: string) => { setSelectKey(key) }
            }}>
                {items.map((item, index) => mode !== "inline" ?
                    <MenuItem
                        item={item}
                        key={item.key}
                        index={index} />
                    : <InlineMenuItem
                        item={item}
                        key={item.key}
                        index={index} />
                )}
            </ActiveKeyContext.Provider>
        </div>
    )
}

export default Menu
export type { MenuProps, MenuItemProps }
export { ActiveKeyContext }